import { useTable } from 'react-table'



function Table({columns, data, containerClassName, heading}) {
    
    const {getTableProps,getTableBodyProps, headerGroups, rows, prepareRow} = useTable({columns, data})
    

  return function table(){
        return <div className={containerClassName}>
            <h2 className="text-2xl">{heading}</h2>

            <table className='table' {...getTableProps}>
                <thead >
                    {headerGroups.map((headerGroup)=> (
                        <tr {...header.getHeaderGroupProps()}>
                            headerGroup.headers.map((columns)=(
                                <th {...columns.getHeaderProps() }>
                                    {columns.render("Header")}
                                </th>
                            ))
                        </tr>
                    ))}

                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        rows.map(row=>{
                            prepareRow(row);
                            return <tr {...row.getRowProps()}>
                                {row.cells.map(cell=>(
                                    <td {...cell.getCellProps}>
                                        {cell.render("Cell")}
                                    </td>
                                ))}
                            </tr>
                        })
                    }

                </tbody>
            </table>

        </div>
  }
}

export default Table