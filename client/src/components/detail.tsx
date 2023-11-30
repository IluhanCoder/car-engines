import DetailsList from "../static/details-list";
import buttonStyle from "../styles/button-style";
import inputStyle, { selectStyle } from "../styles/input-style";
import Detail from "../types/detail-type"

interface LocalParams {
    detail: Detail,
    handleChange: (detail: Detail, index: number) => void,
    index: number,
    handleAdd: (parent: Detail) => void,
    className?: string,
    handleDelete: (index: number) => void 
}

const DetailComponent = ({detail, handleChange, index, handleAdd, className, handleDelete}: LocalParams) => {
    const findDetailFromList = (detailName: string) => {
        if (detail.parent) return detail.parent?.allowedChildren?.filter((candidate: Detail) => candidate.name === detailName)[0];
        else return DetailsList.filter((candidate: Detail) => candidate.name === detailName)[0];
    }

    const localChangeHandler = (field: string, value: any) => {
        if(field === "name") {
            const dataFromList = findDetailFromList(value);
            if(!dataFromList) return;
            const newDetail: Detail = {...dataFromList, parent: detail.parent};
            handleChange(newDetail, index);
        }
        else {
            (detail as any)[field] = value;
            handleChange(detail, index);
        }
    }

    return <div className={`${className} whitespace-nowrap rounded bg-white shadow-lg py-4 px-6 border text-sm`}>
                <form className="flex flex-col gap-3">
                        {detail.parent && <div className="flex justify-end">
                            <button type="button" className={buttonStyle} onClick={() => handleDelete(index)}>X</button>
                        </div>}
                        <div className="text-center">
                            <select className={selectStyle} value={detail.name} onChange={(e) => localChangeHandler("name", e.target.value)}>
                                {
                                    (detail.parent) ? detail.parent.allowedChildren!.map((detail: Detail) => {
                                        return <option>{detail.name}</option>
                                    }) : DetailsList.map((detail: Detail) => {
                                        return <option>{detail.name}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="w-full grid grid-cols-2">
                            <label className="mt-1 overflow-auto">Кількість годин</label>
                            <input className={inputStyle} type="text" value={detail.hoursUsed} onChange={(e) => localChangeHandler("hoursUsed", Number(e.target.value))}/>
                        </div>
                        <div className="w-full grid grid-cols-2">
                            <label className="mt-1 overflow-auto">Термін використання</label>
                            <input className={inputStyle} type="text" value={detail.durability} onChange={(e) => localChangeHandler("durability", Number(e.target.value))}/>
                        </div>
                        {
                            detail.rpm && <div className="w-full grid grid-cols-2">
                                <label className="mt-1 overflow-auto">Кількість обертів</label>
                                <input className={inputStyle} type="number" value={detail.rpm} onChange={(e) => localChangeHandler("rpm", e.target.value)}/>
                            </div>
                        }
                        {
                            detail.voltage && <div className="w-full grid grid-cols-2">
                                <label className="mt-1 overflow-auto">Напруга</label>
                                <input className={inputStyle}  type="number" value={detail.voltage} onChange={(e) => localChangeHandler("voltage", e.target.value)}/>
                            </div>
                        }
                        {detail.allowedChildren && <div className="flex justify-center mt-2">
                            <button className={buttonStyle} type="button" onClick={() => handleAdd(detail)}>додати</button>
                        </div>}
                    </form>
                </div>
}

export default DetailComponent;