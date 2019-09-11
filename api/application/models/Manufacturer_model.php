<?php
class Manufacturer_model extends CI_Model
{

    public function __construct()
    {
    }

    public function get_all()
    {
        $query = $this->db->get('manufacturers');
        return $query->result_array();
    }

    public function create_manufacturer($name)
    {
        if (!$name)
        {
            return 'invalid';
        }
        else
        {
            $this->db->where('name', $name);
            $query = $this->db->get('manufacturers');
            $count_row = $query->num_rows();

            if ($count_row > 0)
            {
                return 'exists';
            }
            else
            {
                $data = array('name' => $name);

                $this->db->insert('manufacturers', $data);
                $id = $this->db->insert_id();

                $this->db->where('id', $id);
                $query = $this->db->get('manufacturers');
                
                return $query->result()[0];
            }
        }
    }
}
