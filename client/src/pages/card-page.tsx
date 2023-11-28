import { useState } from "react";
import Detail from "../types/detail-type";
import DetailsList from "../static/details-list";
import DetailComponent from "../components/detail";

const CardPage = () => {
    
    const [details, setDetails] = useState<Detail[]>([DetailsList[0]]);
    const [detailsTable, setDetailsTable] = useState<Detail|null[][]>([]);

    const handleChange = (detail: Detail, index: number) => {
        const temp = details;
        temp[index] = detail;
        setDetails([...temp]);
    }

    const handleAdd = (parentDetail: Detail) => {
        setDetails([...details, {...DetailsList[0], parent: parentDetail}]);
    }

    const findAllChilren = (parentDetail: Detail) => details.filter((currentDetail: Detail) => currentDetail.parent === parentDetail);

    const renderDetailWithChildren = (detail: Detail) => {
        const children = findAllChilren(detail);
        return <div className="flex flex-col" key={details.indexOf(detail)} >
            <div className="flex flex-row">
                <DetailComponent detail={detail} handleAdd={handleAdd} handleChange={handleChange} index={details.indexOf(detail)}/>
            </div>
            <div className="flex flex-row"> {
                children.map((child: Detail, i: number) => {
                    const grandChilds = findAllChilren(child);
                    if(grandChilds.length > 0) return renderDetailWithChildren(child);
                    else return <div key={i}><DetailComponent detail={child} handleAdd={handleAdd} handleChange={handleChange} index={details.indexOf(child)}/></div>
                })
            }</div>
        </div>
    }

    return <div>
        <div>
            {renderDetailWithChildren(details[0])}
        </div>
    </div>
}

export default CardPage;