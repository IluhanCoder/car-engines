import { observer } from "mobx-react-lite";
import userStore from "../stores/userStore";
import { useEffect, useState } from "react";
import Project from "../types/project-type";
import cardService from "../services/card-service";
import buttonStyle from "../styles/button-style";
import DetailsList from "../static/details-list";
import { useNavigate } from "react-router-dom";
import currentProjectStore from "../stores/currentProjectStore";

const ProjectsPage = () => {
    const userId = userStore.user?._id;
    const navigate = useNavigate();

    const [projects, setProjects] = useState<Project[]>([]);

    const fetchProjects = async () => {
        if(!userId) {
            return;
        }
        const res = await cardService.fetchUserCards(userId!);
        setProjects([...res.data]);
    }

    useEffect(() => {fetchProjects()}, [userId]);

    const handleNewProject = async () => {
        const defaultDetails = [DetailsList[0]];
        const projectName = prompt("будь-ласка, введіть назву нового проекту", "без назви");
        await cardService.createCard(defaultDetails, projectName ?? "без назви");
    }

    const handleOpenProject = (projectId: string) => {
        navigate(`/project/${projectId}`)
    };

    return <div className="flex flex-col">
        <div className="flex flex-col">
        {
            projects.map((project: Project) => {
                return <div className="">
                    <div>
                        {project.name}
                    </div>
                    <div>
                        <button type="button" className={buttonStyle} onClick={() => handleOpenProject(project._id)}>відкрити</button>
                    </div>
                </div>
            })
        }
        </div>
        <div>
            <button className={buttonStyle} onClick={handleNewProject}>створити проект</button>
        </div>
    </div>
}

export default observer(ProjectsPage);