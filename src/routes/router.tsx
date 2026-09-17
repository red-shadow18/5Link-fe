import { createBrowserRouter } from "react-router-dom";
import { Applayout } from "../layouts/AppLayout";
import { Dashboard } from "../pages/Dashboard";
import { Room } from "../pages/Room";
import { Rankings } from "../pages/Rankings";
import { Rules } from "../pages/Rules";
import { Stats } from "../pages/Stats";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Applayout />,
        children: [
            {
                index: true,
                element: <Dashboard/>
            },
            {
                path: "room/:roomId",
                element: <Room />
            },
            {
                path: "rankings",
                element: <Rankings />
            },
            {
                path: "rules",
                element: <Rules />
            },
            {
                path: "stats",
                element: <Stats />
            }
        ]   
    }
])