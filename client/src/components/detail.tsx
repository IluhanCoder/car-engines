import Detail from "../types/detail-type"

interface LocalParams {
    detail: Detail,
    handleChange: (detail: Detail, index: number) => void,
    index: number,
    handleAdd: (parent: Detail) => void,
    className?: string
}

const DetailComponent = ({detail, handleChange, index, handleAdd, className}: LocalParams) => {
    return <div className={className}>
                <div>{index}</div>
                <form>
                        <div>
                            <label>{detail.name}</label>
                        </div>
                        {
                            detail.rpm && <div>
                                <input type="number" value={detail.rpm} onChange={(e) => handleChange({...detail, rpm: Number(e.target.value)},index)}/>
                            </div>
                        }
                        {
                            detail.voltage && <div>
                                <input type="number" value={detail.voltage} onChange={(e) => handleChange({...detail, voltage: Number(e.target.value)},index)}/>
                            </div>
                        }
                        {
                            detail.temperature && <div>
                                <input type="number" value={detail.temperature} onChange={(e) => handleChange({...detail, temperature: Number(e.target.value)},index)}/>
                            </div>
                        }
                        <div>
                            <button type="button" onClick={() => handleAdd(detail)}>додати</button>
                        </div>
                    </form>
                </div>
}

export default DetailComponent;