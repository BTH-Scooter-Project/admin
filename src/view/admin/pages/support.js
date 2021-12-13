import { DashboardTemplate } from "../Dashboard";

function SupportContent() {
    return (
        <>
            <h1 align="center">Logs</h1>
        </>
    );
}

export default function Support() {
    return <DashboardTemplate component={SupportContent}/>;
  }