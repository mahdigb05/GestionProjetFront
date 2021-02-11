import { Button, Input } from "antd";
import Form from "antd/lib/form/Form";
import { useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";

const affectationJuryForm = () => {
  const [Departement, setDepartement] = useState();

  return (
    <Form>
      <Form.Item label="Departement">
        <Input
          onChange={(value) => {
            setDepartement(value.target.value);
          }}
        />
      </Form.Item>

      <Form.Item label="Departement">
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button>
                  <PlusCircleOutlined />
                </Button>,
                <Button>
                  <MinusCircleOutlined />
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={item.nom + " " + item.prenom}
              />
            </List.Item>
          )}
        />
      </Form.Item>
    </Form>
  );
};
