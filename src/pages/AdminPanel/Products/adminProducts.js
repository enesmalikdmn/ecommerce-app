import { Space, Button, Popconfirm } from "antd";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (onDelete, onEdit) {
  return [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => onEdit(record)}>Edit</Button>
          <Button type="primary" danger>
            <Popconfirm
              title="Are you sure to delete this product?"
              onConfirm={() => onDelete(record.id)}
              okText="Yes"
              cancelText="No"
            >
              Delete
            </Popconfirm>
          </Button>
        </Space>
      ),
    },
  ];
}
