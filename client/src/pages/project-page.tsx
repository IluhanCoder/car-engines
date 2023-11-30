import { useEffect, useState } from "react";
import Detail from "../types/detail-type";
import DetailsList from "../static/details-list";
import DetailComponent from "../components/detail";
import { SteppedLineTo } from "react-lineto";
import { useParams } from "react-router-dom";
import cardService from "../services/card-service";
import currentProjectStore from "../stores/currentProjectStore";

const ProjectPage = () => {
    const projectFromStore = currentProjectStore.project?.data;

    const [details, setDetails] = useState<Detail[]>(projectFromStore ?? []);
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
        return <div className="flex flex-col gap-5" key={currentDetailIndex} >
            <div className="flex flex-row gap-5 z-10">
                <DetailComponent handleDelete={handleDelete} className={currentDetailIndex.toString()} detail={detail} handleAdd={handleAdd} handleChange={handleChange} index={currentDetailIndex}/>
            </div>
            <div className="flex flex-row gap-5"> {
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
    
        details.forEach((detail, detailIndex) => {
            const children = findAllChilren(detail);
            children.forEach((child) => {
                const childIndex = details.indexOf(child);
                newLines.push(<SteppedLineTo within="line-container" zIndex={1} borderWidth={3} borderColor="#c7c7c7" key={`${childIndex}${detailIndex}`} from={detailIndex.toString()} to={childIndex.toString()} />);
            });
        });
    
        setLines(newLines);
    }

    return <div className="h-full">
        <div className="bg-gray-100 w-fit line-container h-full p-4">
            {renderDetailWithChildren(details[0])}
            {lines}
        </div>
    </div>
}

export default ProjectPage;