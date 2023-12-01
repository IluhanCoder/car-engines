import DetailsList from "../static/details-list";
import buttonStyle from "../styles/button-style";
import inputStyle, { selectStyle } from "../styles/input-style";
import { largeLabelStyle } from "../styles/label-style";
import Detail from "../types/detail-type"

interface LocalParams {
    detail: Detail,
    handleChange?: (detail: Detail, field: string, value: any) => void,
    handleAdd?: (parent: Detail) => void,
    className?: string,
    handleDelete?: (detail: Detail) => void,
    nameOptions: string[],
    testingMode?: boolean
}

const DetailComponent = ({detail, handleChange, className, handleDelete, nameOptions, handleAdd, testingMode}: LocalParams) => {
    const localChangeHandler = (field: string, value: any) => {
        if(handleChange) handleChange(detail, field, value);
    }

    return <div className={`${className} whitespace-nowrap rounded bg-white shadow-lg py-4 px-6 border text-sm`}>
                <form className="flex flex-col gap-3">
                        {!testingMode && handleDelete && detail.parentIndex !== undefined && <div className="flex justify-end">
                            <button type="button" className={buttonStyle} onClick={() => handleDelete(detail)}>X</button>
                        </div>}
                        <div className="text-center">
                            {!testingMode && <select className={selectStyle} value={detail.name} onChange={(e) => localChangeHandler("name", e.target.value)}>
                                {
                                    (detail.parentIndex !== undefined) ? nameOptions!.map((nameOption: string) => {
                                        return <option>{nameOption}</option>
                                    }) : DetailsList.map((detail: Detail) => {
                                        return <option>{detail.name}</option>
                                    })
                                }
                            </select> || <label className={largeLabelStyle}>{detail.name}</label>}
                        </div>
                        <div className="w-full grid grid-cols-2">
                            <label className="mt-1 overflow-auto">Кількість годин (год.)</label>
                            <input className={inputStyle} type="number" value={detail.hoursUsed} onChange={(e) => localChangeHandler("hoursUsed", Number(e.target.value))}/>
                        </div>
                        <div className="w-full grid grid-cols-2">
                            <label className="mt-1 overflow-auto">Термін використання (год.)</label>
                            <input className={inputStyle} type="number" value={detail.durability} onChange={(e) => localChangeHandler("durability", Number(e.target.value))}/>
                        </div>
                        {
                            detail.rpm && <div className="w-full grid grid-cols-2">
                                <label className="mt-1 overflow-auto">Кількість обертів (об/хв)</label>
                                <input className={inputStyle} type="number" value={detail.rpm} onChange={(e) => localChangeHandler("rpm", e.target.value)}/>
                            </div>
                        }
                        {
                            detail.voltage && <div className="w-full grid grid-cols-2">
                                <label className="mt-1 overflow-auto">Напруга (В)</label>
                                <input className={inputStyle}  type="number" value={detail.voltage} onChange={(e) => localChangeHandler("voltage", e.target.value)}/>
                            </div>
                        }
                        {!testingMode && handleAdd && detail.allowedChildren && <div className="flex justify-center mt-2">
                            <button className={buttonStyle} type="button" onClick={() => handleAdd(detail)}>додати</button>
                        </div>}
                    </form>
                </div>
}

export default DetailComponent;