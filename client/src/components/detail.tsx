import buttonStyle from "../styles/button-style";
import inputStyle from "../styles/input-style";
import Detail from "../types/detail-type"

interface LocalParams {
    detail: Detail,
    handleChange: (detail: Detail, index: number) => void,
    index: number,
    handleAdd: (parent: Detail) => void,
    className?: string
}

const DetailComponent = ({detail, handleChange, index, handleAdd, className}: LocalParams) => {
    return <div className={`${className} rounded bg-white shadow-lg p-4 border`}>
                <form className="flex flex-col gap-2">
                        <div className="text-center">
                            <label>{detail.name}</label>
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
                                <input className={inputStyle} type="number" value={detail.rpm} onChange={(e) => handleChange({...detail, rpm: Number(e.target.value)},index)}/>
                            </div>
                        }
                        {
                            detail.voltage && <div>
                                <label className="mt-1">Напруга</label>
                                <input className={inputStyle}  type="number" value={detail.voltage} onChange={(e) => handleChange({...detail, voltage: Number(e.target.value)},index)}/>
                            </div>
                        }
                        {
                            detail.temperature && <div>
                                <label className="mt-1">Температура</label>
                                <input className={inputStyle}  type="number" value={detail.temperature} onChange={(e) => handleChange({...detail, temperature: Number(e.target.value)},index)}/>
                            </div>
                        }
                        <div className="flex justify-center">
                            <button className={buttonStyle} type="button" onClick={() => handleAdd(detail)}>додати</button>
                        </div>
                    </form>
                </div>
}

export default DetailComponent;