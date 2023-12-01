import { JSXElementConstructor, useEffect, useState } from "react";
import Detail from "../types/detail-type";
import DetailsList from "../static/details-list";
import DetailComponent from "../components/detail";
import { SteppedLine } from "react-lineto";
import { useNavigate, useParams } from "react-router-dom";
import cardService from "../services/card-service";
import currentProjectStore from "../stores/currentProjectStore";
import buttonStyle from "../styles/button-style";
import { grayBoldLabelStyle, largeLabelStyle } from "../styles/label-style";
import Separator from "../components/separator";
import Project from "../types/project-type";
import userStore from "../stores/userStore";
import { observer } from "mobx-react-lite";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ProjectPage = () => {
    const navigate = useNavigate();

    const {projectId} = useParams();

    const [project, setProject] = useState<Project>();

    const getProjectData = async () => {
        const res = await cardService.getCard(projectId!);
        setProject({...res.data});
    }

    useEffect(() => {
        if(userStore.user) {
            getProjectData();
        }
    } ,[userStore.user])

    const [lines, setLines] = useState<JSX.Element[]>([]);
 
    const handleChange = (detail: Detail, field: string, value: any) => {
        const findDetailFromList = (detailName: string) => {
            if (detail.parentIndex !== undefined) return project?.data[detail.parentIndex].allowedChildren?.filter((candidate: Detail) => candidate.name === detailName)[0];
            else return DetailsList.filter((candidate: Detail) => candidate.name === detailName)[0];
        }

        const temp = project?.data;

        if(field === "name") {
            const children = findAllChilren(detail);
            children!.map((child: Detail) => {
                if(!detail.allowedChildren?.includes(child)) temp!.splice(project?.data!.indexOf(child)!,1);
            })
        }

        const detailFromList = findDetailFromList((field === "name") ? value : detail.name);
        const newDetail: Detail = {...detailFromList!, parentIndex: detail.parentIndex};
        if(field !== "name") (newDetail as any)[field] = value;
        const detailIndex = temp?.indexOf(detail);
        (temp as Detail[])[detailIndex!] = {...newDetail};
        if(temp) setProject({...project, data: [...temp]});
    }

    const handleAdd = (parentDetail: Detail) => {
        if(parentDetail.allowedChildren) {
            const newDetail = {...parentDetail.allowedChildren[0], parentIndex: project?.data.indexOf(parentDetail)};
            const newDetails = [...project?.data!, newDetail];
            setProject({...project!, data: [...newDetails!]});
        }
    }

    const handleDelete = (detail: Detail) => {
        const children = findAllChilren(detail!);
        const newDetails = project?.data.filter((candidate: Detail) => !children!.includes(candidate) && candidate !== detail);
        setProject({...project!, data: [...newDetails!]});
    }

    useEffect(() => {setLines([]); generateLines()}, [project?.data])

    const findAllChilren = (parentDetail: Detail) => project?.data.filter((currentDetail: Detail) => currentDetail.parentIndex === project.data.indexOf(parentDetail));

    const getAllowedNames = (detail: Detail) => {
        const parentDetail = project?.data[detail.parentIndex!];
        return (parentDetail) ? parentDetail!.allowedChildren!.map((child: Detail) => child.name)! : DetailsList.map((det: Detail) => det.name);
    }

    const renderDetailWithChildren = (detail: Detail) => {
        const children = findAllChilren(detail);
        const currentDetailIndex = project?.data!.indexOf(detail);
        return <div className="flex flex-col gap-8 flex-nowrap" key={currentDetailIndex} >
            <div className="flex flex-nowrap gap-5 z-10">
                <DetailComponent nameOptions={getAllowedNames(detail)} handleDelete={handleDelete} className={currentDetailIndex!.toString()} detail={detail} handleAdd={handleAdd} handleChange={handleChange}/>
            </div>
            <div className="flex flex-nowrap gap-8"> {
                children!.map((child: Detail) => {
                    const childIndex = project?.data!.indexOf(child);
                    const grandChilds = findAllChilren(child);
                    if(grandChilds!.length > 0) return renderDetailWithChildren(child);
                    else return <div key={childIndex} className="z-10">
                            <DetailComponent nameOptions={getAllowedNames(child)} handleDelete={handleDelete} className={childIndex!.toString()} detail={child} handleAdd={handleAdd} handleChange={handleChange}/>
                        </div>
                })
            }</div>
        </div>
    }

    const handleSave = async () => {
        try {
            await cardService.updateCard(project?.data!, project?._id!);
            toast.success("зміни було успішно збережено");
        } catch (error) {
            throw error;
        }
    }

    const generateLines = () => {
        const newLines: JSX.Element[] = [];
        project?.data!.map((detail: Detail, detailIndex: number) => {
            const children = findAllChilren(detail);
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

    if(project)
        return <div className="flex">
            <div className="overflow-auto grow">
                <div className="h-screen p-4 relative line-container">
                <ToastContainer/>
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
                        <button type="button" className={buttonStyle + " w-full"} onClick={handleSave}>зберегти зміни</button>
                    </div>
                    <div className="flex justify-center">
                        <button type="button" className={buttonStyle + " w-full"}>видалити проект</button>
                    </div>
                </div>
                <Separator/>
                <div className="flex flex-col p-6 gap-4">
                    <div className="flex justify-center ">
                        <button type="button" className={buttonStyle + " w-full"}>режим прогнозування</button>
                    </div>
                </div>
                <Separator/>
                <div className="flex flex-col p-6 gap-4">
                    <div className="flex justify-center ">
                        <button type="button" className={buttonStyle + " w-full"} onClick={() => navigate("/projects")}>вийти з проекта</button>
                    </div>
                </div>
            </div>
        </div>
    else return <div>...</div>
}

export default observer(ProjectPage);