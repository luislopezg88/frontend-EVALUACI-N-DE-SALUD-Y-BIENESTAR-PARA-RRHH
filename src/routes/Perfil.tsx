import PortalLayout from "../layout/PortalLayout";
import { useAuth } from "../auth/AuthProvider";
import '../assets/css/dashboard-page.css';
import Container from 'react-bootstrap/Container';

import Card from 'react-bootstrap/Card';



export default function Perfil() {
  const auth = useAuth();

  return (
    <PortalLayout>
      <div className="dashboard">
        <Container>
          <Card style={{ width: '100%' }}>
            <Card.Header>
              <h2 className="text-center text-primary">
                Perfil de {auth.getUser()?.name ?? ""}
              </h2>
            </Card.Header>
            <Card.Body>
         
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card>
        </Container>
     </div> 
    </PortalLayout>
  );
}
