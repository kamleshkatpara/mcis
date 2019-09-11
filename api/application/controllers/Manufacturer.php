<?php
use Restserver\Libraries\REST_Controller;
defined('BASEPATH') or exit('No direct script access allowed');

require APPPATH . 'libraries/REST_Controller.php';
require APPPATH . 'libraries/Format.php';

class Manufacturer extends CI_Controller
{

    use REST_Controller
    {
        REST_Controller::__construct as private __resTraitConstruct;
    }

    function __construct()
    {
        parent::__construct();
        $this->__resTraitConstruct();
    }

    public function index_get()
    {
        $data = $this->manufacturer_model->get_all();

        if ($data)
        {
            $this->response($data, 200);
        }
        else
        {
            $this->response([
              'status' => false, 'message' => 'No manufacturers found'
            ], 204);
        }
    }

    public function create_post()
    {

        if (!empty($this->post('name')))
        {

            $data = $this->manufacturer_model->create_manufacturer($this->post('name'));

            if ($data == 'invalid')
            {
                $this->set_response([
                  'status' => false, 'message' => 'Something went wrong'
                ], 400);

            }
            else if (!is_string($data))
            {

                $this->set_response([
                  'status' => true, 
                  'message' => 'Manufacturer created successfully', 
                  'data' => $data
                ], 201);

            }
            if ($data == 'exists')
            {

                $this->set_response([
                  'status' => false, 'message' => 'Manufacturer already exists'
                ], 200);

            }
        }
    }
}
