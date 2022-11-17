import './List.css';


const List = ({ addresses }) => {




    return (
        <div className="list">
            <table className=''>
                <tr className='table-header'>
                    <th>Stop No.</th>
                    <th className='header-address'>Address</th>
                    <th>ETA</th>
                </tr>
                {
                    addresses.map((curr, _index) => {
                        return (
                            <>
                                <input type='checkbox' />
                                <tr key={_index} className='address'>
                                    <td className='index'>{_index + 1}</td>
                                    <td className='name'>{curr.name}</td>
                                    <td className='eta'>
                                        {curr.drivingtime && (Math.floor(curr.drivingtime / 60)) + 'min'}
                                    </td>
                                </tr>
                            </>
                        )
                    })
                }
            </table>

        </div>
    )
}

export default List;