<?php
use Restserver\Libraries\REST_Controller;
defined('BASEPATH') or exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

class Model extends CI_Controller
{

    use REST_Controller
    {
        REST_Controller::__construct as private __resTraitConstruct;
    }

    function __construct($config = 'rest')
    {
        header('Access-Control-Allow-Origin: *');
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
        parent::__construct();
        $this->__resTraitConstruct();
    }

    public function index_get()
    {
        $data = $this->model_model->get_all();

        if ($data)
        {
            $this->response($data, 200);
        }
        else
        {
            $this->response([
              'status' => false, 'message' => 'No models found'
            ], 204);
        }
    }

    public function create_post()
    {

        if (!empty($this->post()))
        {

            $data = $this->model_model->create_model($this->post());

            if ($data == 'invalid')
            {

                $this->set_response([
                  'status' => false, 'message' => 'Something went wrong'
                ], 409);

            }
            else if (!is_string($data))
            {

                $this->set_response([
                  'status' => true, 
                  'message' => 'Model created successfully', 
                  'data' => $data
                ], 200);

            }
            if ($data == 'exists')
            {
                $this->set_response([
                  'status' => false, 'message' => 'Model already exists'
                ], 201);

            }
        }
    }

    public function upload_post()
    {

        $this->load->library('upload', $this->config->item('upload'));

        if ($this->upload->do_upload('image1'))
        {
            $this->response($this->upload->data()['file_name'], 200);
            return;
        }
        else if ($this->upload->do_upload('image2'))
        {
            $this->response($this->upload->data()['file_name'], 200);
            return;
        }
        else
        {
            $this->response('Error during file upload => "' . $this
                ->upload->display_errors() , 500);
            return;
        }

    }

    public function deletefile_post() {
        $file = $this->post();
        if(file_exists($file[0])) {
            unlink($file[0]);
            $this->response('deleted', 200);
        } else {
            $this->response('Error in deleting', 500);
        }
    }

    public function sell_post()
    {
        $model = $this->post();
        $query = $this->db->select('stock')->get_where('models', array('id' => $model['id']));

        $current_stock = $query->result_array();

        if ($current_stock[0]['stock'] != 0)
        {

            $data = $this->model_model->sell_model($model['id']);
            $this->db->select(
                'models.id, 
                 manufacturers.name as manufacturer,
                 models.name,
                 models.color,
                 models.manufacturingyear,
                 models.registrationnumber,
                 models.note,
                 models.stock,
                 models.image1,
                 models.image2')
                ->from('models')
                ->join('manufacturers', 'manufacturers.id = models.manufacturer');
            $query = $this->db->where('models.id', $model['id']);
            $query = $this->db->get();
            $this->set_response($query->result()[0], 200);
        }
    }
}
