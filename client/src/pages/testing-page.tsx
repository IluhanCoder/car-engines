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
import buttonStyle, { blueButtonStyle } from "../styles/button-style";
import { grayBoldLabelStyle, largeLabelStyle } from "../styles/label-style";
import inputStyle, { borderedInputStype, selectStyle } from "../styles/input-style";

const TestingPage = () => {
    const [project, setProject] = useState<Project>();
    const [load, setLoad] = useState<number>(1);
    const [temperature, setTemperature] = useState<number>(25);
    const [testTime, setTestTime] = useState<number>(0);
    const [testStep, setTestStep] = useState<number>(30);

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
    const findAllChildrenByIndex = (index: number) => project?.data.filter((currentDetail: Detail) => currentDetail.parentIndex === index);

    const getAllowedNames = (detail: Detail) => {
        const parentDetail = project?.data[detail.parentIndex!];
        return (parentDetail) ? parentDetail!.allowedChildren!.map((child: Detail) => child.name)! : DetailsList.map((det: Detail) => det.name);
    }

    const renderDetailWithChildren = (detail: Detail) => {
        const children = findAllChildren(detail);
        const currentDetailIndex = project?.data!.indexOf(detail);
        return <div className="flex flex-col gap-8 flex-nowrap" key={currentDetailIndex} >
            <div className="flex flex-nowrap gap-5 z-10">
                <DetailComponent repairHandler={repairHandler} testingMode nameOptions={getAllowedNames(detail)} className={currentDetailIndex!.toString()} detail={detail}/>
            </div>
            <div className="flex flex-nowrap gap-8"> {
                children!.map((child: Detail) => {
                    const childIndex = project?.data!.indexOf(child);
                    const grandChilds = findAllChildren(child);
                    if(grandChilds!.length > 0) return renderDetailWithChildren(child);
                    else return <div key={childIndex} className="z-10">
                            <DetailComponent repairHandler={repairHandler} testingMode nameOptions={getAllowedNames(child)}className={childIndex!.toString()} detail={child}/>
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

                const color = (child.isWorkedOut) ? "bg-red-700" : "bg-gray-400"

                const newLine1 = <div className={`z-1 absolute w-1 ${color}`} style={{top:`${fromY - 20}px`,left:`${fromX}px`, height: `${(toY-fromY)/2}px`}}/>
                const newLine2 = <div className={`z-1 absolute h-1 ${color}`} style={{top:`${fromY+((toY-fromY)/2) - 20}px`,left:`${(fromX > toX) ? toX : fromX}px`, width: `${Math.abs(fromX-toX)}px`}}/>
                const newLine3 = <div className={`z-1 absolute w-1 ${color}`} style={{top:`${fromY+((toY-fromY)/2) - 20}px`,left:`${toX}px`, height: `${(toY-fromY)/2 + 6}px`}}/>

                newLines.push(newLine1);
                newLines.push(newLine2);
                newLines.push(newLine3);
            })
        });
        setLines([...newLines]);
    }

    const updateDetail = (detail: Detail, field: string, value: any) => {
        const projectData = project?.data;
        const newDetail = {...detail, [field]: value};
        const tempData = projectData;
        tempData![projectData?.indexOf(detail)!] = newDetail;
        setProject({...project!, data: tempData!});
    }

    const calculate = () => {
        project?.data.map((currentDetail: Detail, i: number) => {
            if((currentDetail?.voltage!/10)>currentDetail?.maxVoltage!) {
                const newValue = currentDetail.durability - currentDetail.durability/100 * (currentDetail?.voltage! / 10 - currentDetail?.maxVoltage!) * 8;
                updateDetail(currentDetail, "durability", newValue);
            }

            if(currentDetail.hoursUsed >= currentDetail.durability) {
                updateDetail(currentDetail, "isWorkedOut", true);
            }

            if(currentDetail.name === "автомобільне масло" && (temperature <= -40 || temperature >= 40)) {
                updateDetail(currentDetail, "isWorkedOut", true);
            }

            if(currentDetail.name === "акамулятор" && (temperature <= -18 || temperature >= 35)) {
                updateDetail(currentDetail, "isWorkedOut", true);
            }

            if(currentDetail.isWorkedOut) {
                const children = findAllChildrenByIndex(i);
                children?.map((child: Detail) => {
                    updateDetail(child, "isWorkedOut", true);
                })
            }

            if(currentDetail.isWorkedOut && (currentDetail.name === "поршневі кільця" || currentDetail.name === "поршневий палець")) {
                const parent = project.data[currentDetail?.parentIndex!];
                const newValue = parent.durability - (parent.durability / 100 * 30);
                updateDetail(parent, "durability", newValue);
            }
        })

        for (let i: number = 0; i < testStep; i++) {
            project?.data.map((currentDetail: Detail) => {
                if(currentDetail?.name==="двигун внутрішнього згорання" && currentDetail?.rpm! > 1000) {
                    const newValue = currentDetail.hoursUsed + load + ((currentDetail?.rpm! - 1000) / 500) * (load / 5);
                    updateDetail(currentDetail, "hoursUsed", newValue);
                }
                else updateDetail(currentDetail, "hoursUsed", currentDetail.hoursUsed + load);

                if(currentDetail?.name==="електродвигун" && currentDetail?.rpm! > 13000) {
                    const newValue = currentDetail.hoursUsed + (currentDetail?.rpm! / 1000) * (load / 3);
                    updateDetail(currentDetail, "hoursUsed", newValue);
                } else updateDetail(currentDetail, "hoursUsed", currentDetail.hoursUsed + load);


            })
        }

        project?.data.map((currentDetail: Detail) => {
            const newCoef = (currentDetail.isWorkedOut) ? 0 : 100 - ((currentDetail.hoursUsed / currentDetail.durability) * 100);
            updateDetail(currentDetail, "workCoef", (newCoef < 0)? 0 : newCoef);
        })
    }

    const findDetailFromList = (detail: Detail) => {
        if (detail.parentIndex !== undefined) return project?.data[detail.parentIndex].allowedChildren?.filter((candidate: Detail) => candidate.name === detail.name)[0];
        else return DetailsList.filter((candidate: Detail) => candidate.name === detail.name)[0];
    }

    const repairHandler = (detail: Detail) => {
        console.log(detail);
        const detailFromList = findDetailFromList(detail);
        const newDetail: Detail = {...detailFromList!, parentIndex: detail.parentIndex};
        const tempData = project?.data!;
        const detailIndex = tempData?.indexOf(detail!);
        tempData[detailIndex] = newDetail;
        setProject({...project!, data: [...tempData]});
    }

    const repairAllHandler = () => {
        project?.data.map((detail: Detail) => {
            repairHandler(detail);
        })
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
                <div className="flex flex-col gap-1 justify-center pb-2">
                    <label className={grayBoldLabelStyle}>Навантаження:</label>
                    <select className={selectStyle} value={load} onChange={(e) => setLoad(Number(e.target.value))}>
                        <option value={0.5}>Слабке</option>
                        <option value={1}>Нормальне</option>
                        <option value={1.5}>Перевантаження</option>
                    </select>
                </div>
                <div className="flex flex-col gap-1 justify-center text-center">
                    <div>Температура {temperature}C</div>
                    <input type="range" min={-40} max={60} value={temperature} onChange={(e) => setTemperature(Number(e.target.value))}/>
                </div>
                <div className="flex flex-col gap-1 justify-center text-center">
                    <div>Загальний час:</div>
                    <div>{testTime} год.</div>
                </div>
                <div className="flex flex-col gap-1">
                    <div>Тривалість тесту (год.):</div>
                    <input min={1} type="number" value={testStep} onChange={(e) => setTestStep(Number(e.target.value))} className={borderedInputStype}/>
                </div>
                <div className="flex flex-col gap-1">
                    <button type="button" onClick={calculate} className={blueButtonStyle}>тест</button>
                </div>
            </div>
            <Separator/>
            <div className="flex flex-col p-6 gap-4">
                <div className="flex justify-center">
                    <button type="button" className={buttonStyle + " w-full"} onClick={repairAllHandler}>замінити всі деталі</button>
                </div>
            </div>
            <Separator/>
            <div className="flex flex-col p-6 gap-4">
                <div className="flex justify-center">
                    <button type="button" className={buttonStyle + " w-full"} onClick={() => navigate(`/project/${project._id}`)}>завершити тестування</button>
                </div>
                <div className="flex justify-center ">
                    <button type="button" className={buttonStyle + " w-full"} onClick={handleEscape}>вийти з проекту</button>
                </div>
            </div>
        </div>
    </div>
    else return <LoadingScreen/>
}

export default TestingPage;