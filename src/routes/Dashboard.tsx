import { useEffect, useState } from "react";
import PortalLayout from "../layout/PortalLayout";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/authConstants";
import { faker } from '@faker-js/faker';
import '../assets/css/dashboard-page.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export const dataArea = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export default function Dashboard() {
  const auth = useAuth();

  const [todos, setTodos] = useState<Todo[]>([]);
  //const [value, setValue] = useState("");

  async function getTodos() {
    const accessToken = auth.getAccessToken();
    try {
      const response = await fetch(`${API_URL}/posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const json = await response.json();
        setTodos(json);
        console.log(json);
      }
    } catch (error) {
      console.log(error);
    }
  }

  /*async function createTodo() {
    if (value.length > 3) {
      try {
        const response = await fetch(`${API_URL}/posts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.getAccessToken()}`,
          },
          body: JSON.stringify({ title: value }),
        });
        if (response.ok) {
          const todo = (await response.json()) as Todo;
          setTodos([...todos, todo]);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }*/

  useEffect(() => {
    getTodos();
  }, []);

  /*function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    createTodo();
  }*/

  return (
    <PortalLayout>
      <div className="dashboard">
        <Container>

          <Card style={{ width: '100%' }}>
            <Card.Body>
              <h1 className="text-center text-primary">
                Dashboard de {auth.getUser()?.name ?? ""}
              </h1>
              
              <Row>
                <Col xs={12} md={6}>
                  <div className="p-4">
                    <h4 className="title-char">
                      Gráfico de Rutina 
                    </h4>
                    <Bar options={options} data={data} />
                  </div> 
                </Col>
                <Col xs={12} md={6}>
                  <div className="p-4">
                    <h4 className="title-char">
                      Gráfico de Cuestionarios 
                    </h4>
                    <Line options={options} data={data} />;
                  </div>
                </Col>
              </Row>

              <Row style={{ marginTop: 10 }}>
                <Col xs={12} md={6}>
                  <div className="p-4">
                    <h4 className="title-char">
                      Gráfico de Retroalimentación
                    </h4>
                    <Line options={options} data={dataArea} />
                  </div> 
                </Col>
                <Col xs={12} md={6}>
                  <div className="p-4">
                    <h4 className="title-char">
                      Gráfico de Empleados
                    </h4>
                    <Bar options={options} data={data} />
                  </div>
                </Col>
              </Row>

              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>

          
      
            {todos.map((post: Todo) => (
              <div key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.completed}</p>
              </div>
            ))}
        </Container>
     </div> 
    </PortalLayout>
  );
}
