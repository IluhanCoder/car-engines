import { useEffect, useState } from "react";
import cardService from "../services/card-service";
import userStore from "../stores/userStore";
import Project from "../types/project-type";
import { useNavigate, useParams } from "react-router-dom";
import LoadingScreen from "../components/loading-screen";
import DetailComponent from "../components/detail";
import Detail from "../types/detail-type";
import DetailsList from "../static/details-list";
import Separator from "../components/separator";
import buttonStyle from "../styles/button-style";
import { grayBoldLabelStyle, largeLabelStyle } from "../styles/label-style";

const TestingPage = () => {
    const [project, setProject] = useState<Project>();
    const {projectId} = useParams();
    const [lines, setLines] = useState<JSX.Element[]>([]);
    const navigate = useNavigate();

    const getProjectData = async () => {
        const res = await cardService.getCard(projectId!);
        setProject({...res.data});
    }

    const handleEscape = () => {
        if(window.confirm("Увага. Якщо ви не зберeгли проект, при виході з проекту зміни будуть втрачені")) {
            navigate("/projects");
        }
    }

    useEffect(() => {
        if(userStore.user) {
            getProjectData();
        }
    } ,[userStore.user])

    const findAllChildren = (parentDetail: Detail) => project?.data.filter((currentDetail: Detail) => currentDetail.parentIndex === project.data.indexOf(parentDetail));

    const getAllowedNames = (detail: Detail) => {
        const parentDetail = project?.data[detail.parentIndex!];
        return (parentDetail) ? parentDetail!.allowedChildren!.map((child: Detail) => child.name)! : DetailsList.map((det: Detail) => det.name);
    }

    const renderDetailWithChildren = (detail: Detail) => {
        const children = findAllChildren(detail);
        const currentDetailIndex = project?.data!.indexOf(detail);
        return <div className="flex flex-col gap-8 flex-nowrap" key={currentDetailIndex} >
            <div className="flex flex-nowrap gap-5 z-10">
                <DetailComponent testingMode nameOptions={getAllowedNames(detail)} className={currentDetailIndex!.toString()} detail={detail}/>
            </div>
            <div className="flex flex-nowrap gap-8"> {
                children!.map((child: Detail) => {
                    const childIndex = project?.data!.indexOf(child);
                    const grandChilds = findAllChildren(child);
                    if(grandChilds!.length > 0) return renderDetailWithChildren(child);
                    else return <div key={childIndex} className="z-10">
                            <DetailComponent testingMode nameOptions={getAllowedNames(child)}className={childIndex!.toString()} detail={child}/>
                        </div>
                })
            }</div>
        </div>
    }

    useEffect(() => {setLines([]); generateLines()}, [project])

    const generateLines = () => {
        const newLines: JSX.Element[] = [];
        project?.data!.map((detail: Detail, detailIndex: number) => {
            const children = findAllChildren(detail);
            children!.forEach((child) => {
                const childIndex = project.data!.indexOf(child);

                const container = document.getElementsByClassName("line-container")[0];
                const containerRect = container.getBoundingClientRect();

                const fromElement = document.getElementsByClassName(detailIndex.toString())[0];
                const toElement = document.getElementsByClassName(childIndex.toString())[0];

                const fromY = fromElement ? fromElement.getBoundingClientRect().bottom - containerRect.top + window.scrollY : 0;
                const toY = toElement ? toElement.getBoundingClientRect().top - containerRect.top + window.scrollY : 0;

                const fromX = fromElement ? fromElement.getBoundingClientRect().left - containerRect.left + fromElement.getBoundingClientRect().width / 2 + window.scrollY : 0;
                const toX = toElement ? toElement.getBoundingClientRect().left - containerRect.left + toElement.getBoundingClientRect().width / 2 + window.scrollY : 0;

                const newLine1 = <div className={`z-1 absolute w-1 bg-gray-400`} style={{top:`${fromY - 20}px`,left:`${fromX}px`, height: `${(toY-fromY)/2}px`}}/>
                const newLine2 = <div className={`z-1 absolute h-1 bg-gray-400`} style={{top:`${fromY+((toY-fromY)/2) - 20}px`,left:`${(fromX > toX) ? toX : fromX}px`, width: `${Math.abs(fromX-toX)}px`}}/>
                const newLine3 = <div className={`z-1 absolute w-1 bg-gray-400`} style={{top:`${fromY+((toY-fromY)/2) - 20}px`,left:`${toX}px`, height: `${(toY-fromY)/2 + 6}px`}}/>

                newLines.push(newLine1);
                newLines.push(newLine2);
                newLines.push(newLine3);
            })
        });
        setLines([...newLines]);
    }

    if(project) return <div className="flex">
        <div className="overflow-auto grow">
            <div className="h-screen p-4 relative line-container">
                <div className="absolute w-full h-full">
                    {renderDetailWithChildren(project.data[0])}
                    {lines}
                </div>
            </div>
        </div>
        <div className="z-20 bg-gray-100 border-l-2 border-gray-200 shadow-lg h-screen">
            <div className="flex flex-col py-6 px-2 gap-1">
                <div className="flex justify-center">
                    <label className={grayBoldLabelStyle}>Назва проекту:</label> 
                </div>
                <div className="flex justify-center">
                    <label className={largeLabelStyle}>{project?.name}</label>
                </div>
            </div>
            <Separator/>
            <div className="flex flex-col p-6 gap-4">
                <div className="flex justify-center">
                    <button type="button" className={buttonStyle + " w-full"} onClick={() => navigate(`/project/${project._id}`)}>завершити тестування</button>
                </div>
            </div>
            <Separator/>
            <div className="flex flex-col p-6 gap-4">
                <div className="flex justify-center ">
                    <button type="button" className={buttonStyle + " w-full"} onClick={handleEscape}>вийти з проекту</button>
                </div>
            </div>
        </div>
    </div>
    else return <LoadingScreen/>
}

export default TestingPage;