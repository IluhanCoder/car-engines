import { JSXElementConstructor, useEffect, useState } from "react";
import Detail from "../types/detail-type";
import DetailsList from "../static/details-list";
import DetailComponent from "../components/detail";
import { SteppedLine } from "react-lineto";
import { useParams } from "react-router-dom";
import cardService from "../services/card-service";
import currentProjectStore from "../stores/currentProjectStore";
import buttonStyle from "../styles/button-style";
import { grayBoldLabelStyle, largeLabelStyle } from "../styles/label-style";
import Separator from "../components/separator";

const ProjectPage = () => {
    const projectFromStore = currentProjectStore.project;

    const [details, setDetails] = useState<Detail[]>(projectFromStore?.data ?? []);
    const [lines, setLines] = useState<JSX.Element[]>([]);
 
    const handleChange = (detail: Detail, index: number) => {
        const temp = details;
        temp[index] = detail;
        const children = findAllChilren(detail);
        children.map((child: Detail) => {
            if(!detail.allowedChildren?.includes(child)) temp.splice(details.indexOf(child, 1))
        })
        setDetails([...temp]);
    }

    const handleAdd = (parentDetail: Detail) => {
        if(parentDetail.allowedChildren) {
            const newDetail = {...parentDetail.allowedChildren[0], parent: parentDetail};
            const newDetails = [...details, newDetail];
            setDetails([...newDetails]);
        }
    }

    const handleDelete = (index: number) => {
        const parentDetail = details[index];
        const children = findAllChilren(parentDetail);
        const newDetails = details.filter((detail: Detail) => !children.includes(detail) && detail !== parentDetail);
        setDetails([...newDetails]);
        console.log(details);
    }

    useEffect(() => {setLines([]); generateLines()}, [details])

    const findAllChilren = (parentDetail: Detail) => details.filter((currentDetail: Detail) => currentDetail.parent === parentDetail);

    const renderDetailWithChildren = (detail: Detail) => {
        const children = findAllChilren(detail);
        const currentDetailIndex = details.indexOf(detail);
        return <div className="flex flex-col gap-8 flex-nowrap" key={currentDetailIndex} >
            <div className="flex flex-nowrap gap-5 z-10">
                <DetailComponent handleDelete={handleDelete} className={currentDetailIndex.toString()} detail={detail} handleAdd={handleAdd} handleChange={handleChange} index={currentDetailIndex}/>
            </div>
            <div className="flex flex-nowrap gap-8"> {
                children.map((child: Detail) => {
                    const childIndex = details.indexOf(child);
                    const grandChilds = findAllChilren(child);
                    if(grandChilds.length > 0) return renderDetailWithChildren(child);
                    else return <div key={childIndex} className="z-10">
                            <DetailComponent handleDelete={handleDelete} className={childIndex.toString()} detail={child} handleAdd={handleAdd} handleChange={handleChange} index={childIndex}/>
                        </div>
                })
            }</div>
        </div>
    }

    const generateLines = () => {
        const newLines: JSX.Element[] = [];
        details.map((detail: Detail, detailIndex: number) => {
            const children = findAllChilren(detail);
            children.forEach((child) => {
                const childIndex = details.indexOf(child);

                const container = document.getElementsByClassName("line-container")[0];
                const containerRect = container.getBoundingClientRect();

                const fromElement = document.getElementsByClassName(detailIndex.toString())[0];
                const toElement = document.getElementsByClassName(childIndex.toString())[0];

                const fromY = fromElement ? fromElement.getBoundingClientRect().bottom - containerRect.top + window.scrollY : 0;
                const toY = toElement ? toElement.getBoundingClientRect().top - containerRect.top + window.scrollY : 0;

                console.log(fromY);

                const fromX = fromElement ? fromElement.getBoundingClientRect().left - containerRect.left + fromElement.getBoundingClientRect().width / 2 + window.scrollY : 0;
                const toX = toElement ? toElement.getBoundingClientRect().left - containerRect.left + toElement.getBoundingClientRect().width / 2 + window.scrollY : 0;

                console.log(fromX);

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

    return <div className="flex">
        <div className="overflow-auto grow">
            <div className="h-screen p-4 relative line-container">
                <div className="absolute w-full h-full">
                    {renderDetailWithChildren(details[0])}
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
                    <label className={largeLabelStyle}>{projectFromStore?.name}</label>
                </div>
            </div>
            <Separator/>
            <div className="flex flex-col p-6 gap-4">
                <div className="flex justify-center">
                    <button type="button" className={buttonStyle + " w-full"}>зберегти зміни</button>
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
        </div>
    </div>
}

export default ProjectPage;