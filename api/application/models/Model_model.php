<?php
class Model_model extends CI_Model
{

    public function __construct()
    {
    }

    public function get_all()
    {
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
            ->join('manufacturers', 'models.manufacturer = manufacturers.id');
        $query = $this->db->where('models.stock !=', 0);
        $query = $this->db->get();
        return $query->result();
    }

    public function create_model($model)
    {

        if (!$model['manufacturer'] || !$model['name'] || !$model['color'] || !$model['manufacturingyear'] || !$model['registrationnumber'] || !$model['note'] || !$model['stock'])
        {
            return 'invalid';
        }
        else
        {

            $this->db->where('name', $model['name']);
            $query = $this->db->get('models');
            $count_row = $query->num_rows();

            if ($count_row > 0)
            {
                return 'exists';
            }
            else
            {
                if (!array_key_exists("image1",$model) && !array_key_exists("image2",$model))
                {
                    $data = array(
                        'manufacturer' => $model['manufacturer'],
                        'name' => $model['name'],
                        'color' => $model['color'],
                        'manufacturingyear' => $model['manufacturingyear'],
                        'registrationnumber' => $model['registrationnumber'],
                        'note' => $model['note'],
                        'stock' => $model['stock']
                    );
                } else if (!array_key_exists("image2",$model) && array_key_exists("image1",$model))
                {
                    $data = array(
                        'manufacturer' => $model['manufacturer'],
                        'name' => $model['name'],
                        'color' => $model['color'],
                        'manufacturingyear' => $model['manufacturingyear'],
                        'registrationnumber' => $model['registrationnumber'],
                        'note' => $model['note'],
                        'stock' => $model['stock'],
                        'image1' => $model['image1']
                    );
                } else if (!array_key_exists("image1",$model) && array_key_exists("image2",$model))
                {
                    $data = array(
                        'manufacturer' => $model['manufacturer'],
                        'name' => $model['name'],
                        'color' => $model['color'],
                        'manufacturingyear' => $model['manufacturingyear'],
                        'registrationnumber' => $model['registrationnumber'],
                        'note' => $model['note'],
                        'stock' => $model['stock'],
                        'image2' => $model['image2']
                    );
                }
                else {
                    $data = array(
                        'manufacturer' => $model['manufacturer'],
                        'name' => $model['name'],
                        'color' => $model['color'],
                        'manufacturingyear' => $model['manufacturingyear'],
                        'registrationnumber' => $model['registrationnumber'],
                        'note' => $model['note'],
                        'stock' => $model['stock'],
                        'image1' => $model['image1'],
                        'image2' => $model['image2']
                    );
                }
                
                $this->db->insert('models', $data);
                $id = $this->db->insert_id();

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
                
                $query = $this->db->where('models.id', $id);
                $query = $this->db->get();
                return $query->result() [0];
            }
        }
    }

    public function sell_model($id)
    {
        $sell = $this->db->set('stock', 'GREATEST(0, stock - 1)', false)
            ->where('id', $id)->update('models');
        return $sell;
    }
}
