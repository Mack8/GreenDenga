import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { Layout } from "./components/Layout/Layout";
import { Home } from "./components/Home/Home";
import { PageNotFound } from "./components/Home/PageNotFound";
import { ListMateriales } from "./components/Movie/ListMateriales";
import { DetailMateriales } from "./components/Movie/DetailMateriales";
import { ListCentroAcopio } from "./components/Movie/ListCentroAcopio";
import { DetailCentroAcopio } from "./components/Movie/DetailCentroAcopio";
import TableCanjes from "./components/Movie/TableCanjesCliente";
import { DetalleCanje } from "./components/Movie/DetalleCanje";
import TableCanjesAdmin from "./components/Movie/TableCanjesAdministrador";
import { CreateCentroAcopio } from "./components/Movie/CreateCentroAcopio";
import { ListCentro } from "./components/Movie/ListCentroAcopioAdmin";
import { UpdateCentroAcopio } from "./components/Movie/ModificarCentro";
import { UpdateMateriales } from "./components/Movie/UpdateMateriales";
import { CreateMateriales } from "./components/Movie/CreateMateriales";
import { CreateCanjeForm } from "./components/Movie/CreateCanje";
import { Unauthorized } from "./components/User/Unauthorized";
import { Login } from "./components/User/Login";
import { Logout } from "./components/User/Logout";
import { Signup } from "./components/User/Signup";
import UserProvider from "./components/User/UserProvider";
import { WalletView } from "./components/Movie/Wallet";
import { CreateCupones } from "./components/Movie/CreateCupon";
import { DetailCupones } from "./components/Movie/DetailCupones";
import { ListCupones } from "./components/Movie/ListCupones";
import { UpdateCupones } from "./components/Movie/UpdateCupones";
import { ListCuponesAdmin } from "./components/Movie/ListCuponesAdmin";
import { CanjeCupones } from "./components/Movie/CanjeCupones";
import { Auth } from "./components/User/Auth";
import { SignupAdmin } from "./components/User/SignupAdmin";
import { ListMaterialesAdmin } from "./components/Movie/ListMaterialesAdmin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
  {
    path: "/materiales",
    element: <ListMateriales />,
  },
  {
    path: "/centro_acopio",
    element: <ListCentroAcopio />,
  },
  {
    path: "/materiales/:id",
    element: <DetailMateriales />,
  },
  {
    path: "/centroacopio/:id",
    element: <DetailCentroAcopio />,
  },
  {
    path: "/canje/",
    element: <TableCanjes />,
  },
  {
    path: "/canje/detalle/:id",
    element: <DetalleCanje />,
  },

  {
    path: "/",
    element: (
      <Auth allowedRoles={["AdministradorCentroAcopio", "Administrador"]} />
    ),
    children: [
      {
        path: "/create/canje",
        element: <CreateCanjeForm />,
      },
      {
        path: "/centroacopio/admin",
        element: <ListCentro />,
      },
      {
        path: "/canje/admin",
        element: <TableCanjesAdmin />,
      },
      {
        path: "/centroacopio/create",
        element: <CreateCentroAcopio />,
      },
      {
        path: "/materiales/update/:id",
        element: <UpdateMateriales />,
      },
      {
        path: "/materiales/create",
        element: <CreateMateriales />,
      },
      {
        path: "/centroacopio/update/:id",
        element: <UpdateCentroAcopio />,
      },
      {
        path: "/cupon/create",
        element: <CreateCupones />,
      },
      {
        path: "/cupones/update/:id",
        element: <UpdateCupones />,
      },
      {
        path: "/cupones/admin",
        element: <ListCuponesAdmin />,
      },
      {
        path: "/cupones/listaAdmin",
        element: <ListCuponesAdmin />,
      },
      {
        path: "/user/createAdmin",
        element: <SignupAdmin/>,
      },

      {
        path: "/materiales/listaAdmin",
        element: <ListMaterialesAdmin/>,
      },
    ],
  },

  {
    path: "/",
    element: (
      <Auth allowedRoles={["Usuario"]} />
    ),
    children: [     
      {
        path: "/cupones/canje",
        element: <CanjeCupones />,
      },
      {
        path: "/user/wallet",
        element: <WalletView />,
      },
      {
        path: "/cupones/:id",
        element: <DetailCupones />,
      },

    ],
  },    
  {
    path: "/user/login",
    element: <Login />,
  },
  {
    path: "/user/logout",
    element: <Logout />,
  },
  {
    path: "/user/create",
    element: <Signup />,
  },
  {
    path: "/cupones/lista",
    element: <ListCupones />,
  },
]);

export default function App() {
  return (
    <UserProvider>
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </UserProvider>
  );
}
