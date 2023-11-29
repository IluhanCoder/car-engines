import DetailsList from "../static/details-list";
import buttonStyle from "../styles/button-style";
import inputStyle from "../styles/input-style";
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
    const localChangeHandler = (field: string, value: any) => {
        (detail as any)[field] = value;
        handleChange(detail, index);
    }

    return <div className={`${className} rounded bg-white shadow-lg p-4 border`}>
                <form className="flex flex-col gap-2">
                        <div className="flex justify-end">
                            <button type="button" className={buttonStyle} onClick={() => handleDelete(index)}>X</button>
                        </div>
                        <div className="text-center">
                            <select value={detail.name} onChange={(e) => localChangeHandler("name", e.target.value)}>
                                {
                                    DetailsList.map((detail: Detail) => {
                                        return <option>{detail.name}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div>
                            <label className="mt-1">Кількість годин</label>
                            <input className={inputStyle} type="text"/>
                        </div>
                        <div>
                            <label className="mt-1">Термін використання</label>
                            <input className={inputStyle} type="text"/>
                        </div>
                        {
                            detail.rpm && <div>
                                <label className="mt-1">Кількість обертів</label>
                                <input className={inputStyle} type="number" value={detail.rpm} onChange={(e) => localChangeHandler("rpm", e.target.value)}/>
                            </div>
                        }
                        {
                            detail.voltage && <div>
                                <label className="mt-1">Напруга</label>
                                <input className={inputStyle}  type="number" value={detail.voltage} onChange={(e) => localChangeHandler("voltage", e.target.value)}/>
                            </div>
                        }
                        {
                            detail.temperature && <div>
                                <label className="mt-1">Температура</label>
                                <input className={inputStyle}  type="number" value={detail.temperature} onChange={(e) => localChangeHandler("temperature", e.target.value)}/>
                            </div>
                        }
                        <div className="flex justify-center">
                            <button className={buttonStyle} type="button" onClick={() => handleAdd(detail)}>додати</button>
                        </div>
                    </form>
                </div>
}

export default DetailComponent;