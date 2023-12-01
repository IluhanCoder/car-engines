import { observer } from "mobx-react-lite";
import userStore from "../stores/userStore";
import { useEffect, useState } from "react";
import Project from "../types/project-type";
import cardService from "../services/card-service";
import buttonStyle, { blueButtonStyle } from "../styles/button-style";
import DetailsList from "../static/details-list";
import { useNavigate } from "react-router-dom";
import currentProjectStore from "../stores/currentProjectStore";
import DateFormater from "../misc/date-formatter";
import { grayBoldLabelStyle, largeLabelStyle, lightBoldLabelStyle } from "../styles/label-style";
import LoadingScreen from "../components/loading-screen";

const ProjectsPage = () => {
    const userId = userStore.user?._id;
    const navigate = useNavigate();

    const [projects, setProjects] = useState<Project[]|undefined>();

    const fetchProjects = async () => {
        if(!userId) {
            return;
        }
        const res = await cardService.fetchUserCards(userId!);
        setProjects([...res.data]);
    }

    useEffect(() => {fetchProjects()}, [userId]);

    const handleNewProject = async () => {
        try {
            const defaultDetails = [DetailsList[0]];
            const projectName = prompt("будь-ласка, введіть назву нового проекту", "без назви");
            const res = await cardService.createCard(defaultDetails, projectName ?? "без назви");
            const newCardId = res.card._id;
            navigate(`/project/${newCardId}`);
        } catch (error) {
            throw error;
        }
    }

    const handleOpenProject = (projectId: string) => {
        navigate(`/project/${projectId}`)
    };

    if(projects) return <div className="flex flex-col w-full h-screen">
        <div className={"flex justify-center pt-6 " + largeLabelStyle}>
            Ваші проекти:
        </div>
        {projects.length > 0 && <div className="py-5 h-4/5 ">
            <div className="grid bg-gray-100 rounded grid-cols-3 text-center font-bold py-1">
                        <div>назва</div>
                        <div>дата створення</div>
                        <div>останні зміни</div>
            </div>
            <div className="overflow-auto">
                <div className="grid grid-cols-1 px-6 mt-2 w-full gap-2">
                {
                    projects.map((project: Project) => {
                        return <div className="flex border-b border-gray-200 px-4 py-2">
                            <div className="grid grid-cols-3 w-full">
                                <div className="flex justify-center">
                                    {project.name}
                                </div>
                                <div className={"text-center " + lightBoldLabelStyle}>
                                    <DateFormater value={project.creationTime}/>
                                </div>
                                <div className={"text-center " + lightBoldLabelStyle}>
                                    <DateFormater value={project.lastChangesTime}/>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <button type="button" className={buttonStyle} onClick={() => handleOpenProject(project._id)}>відкрити</button>
                            </div>
                        </div>
                    })
                }
                </div>  
            </div>
        </div> ||
        <div className="flex justify-center w-full h-4/5">
            <div className={"flex justify-center pt-56 " + grayBoldLabelStyle}>
                У вас нема проектів
            </div>
        </div>
        }
        <div className="flex justify-center">
            <button className={blueButtonStyle} onClick={handleNewProject}>створити проект</button>
        </div>
        <div className="absolute left-2 bottom-2">
            <button className={buttonStyle}>Вийти з облікового запису</button>
        </div>
    </div>
    else return <LoadingScreen/>
}

export default observer(ProjectsPage);