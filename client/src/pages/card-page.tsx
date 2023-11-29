import { useEffect, useState } from "react";
import Detail from "../types/detail-type";
import DetailsList from "../static/details-list";
import DetailComponent from "../components/detail";
import { SteppedLineTo } from "react-lineto";

const CardPage = () => {
    
    const [details, setDetails] = useState<Detail[]>([DetailsList[0]]);
    const [detailsTable, setDetailsTable] = useState<Detail|null[][]>([]);
    const [lines, setLines] = useState<JSX.Element[]>([]);

    const handleChange = (detail: Detail, index: number) => {
        const temp = details;
        temp[index] = detail;
        setDetails([...temp]);
    }

    const handleAdd = (parentDetail: Detail) => {
        const newDetail = {...DetailsList[0], parent: parentDetail};
        const newDetails = [...details, newDetail];
        setDetails([...newDetails]);
    }

    const handleDelete = (index: number) => {
        const temp = details;
        temp.splice(index, 1);
        setDetails([...temp]);
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
                console.log(`${childIndex}${detailIndex}`);
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

export default CardPage;