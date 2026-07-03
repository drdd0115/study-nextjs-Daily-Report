import React from 'react'
import styles from './Table.module.css'

const dummyData = [
  { date: '2026-07-03', name: 'Taro', task: 'Coding', comment: '70% Completed', id: 1 },
  { date: '2026-07-04', name: 'Jiro', task: 'Coding', comment: '70% Completed', id: 2 },
  { date: '2026-07-05', name: 'Saburo', task: 'Coding', comment: '70% Completed', id: 3 },
];


export default function Table({ data}) {
  return (
    <table className={styles.table}>
      <thead className={styles.tableHead}>
        <tr>
          <th>Date</th>
          <th>Name</th>
          <th>Task</th>
          <th>Comment</th>
        </tr>
      </thead>
      <tbody className={styles.tableBody}>
        {data.map(item => (
          <tr key={item.id}>
            <td>{item.date} {item.time}</td>
            <td>{item.name}</td>
            <td>{item.task}</td>
            <td>{item.comment}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
