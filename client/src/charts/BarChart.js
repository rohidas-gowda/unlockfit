import React from 'react'
import {Bar} from 'react-chartjs-2'
import Chart from 'chart.js/auto'

function BarChart() {
    const state = {
        labels: ['24-05-2023', '25-05-2023', '26-05-2023',
                 '27-05-2023', '28-05-2023', '29-05-2023', '30-05-2023'],
        datasets: [
          {
            label: 'Daily Weight',
            backgroundColor: 'rgb(255 255 255)',
            borderColor: 'rgb(210, 167, 43)',
            borderWidth: 2,
            data: [70, 72, 71, 74, 71, 70, 73]
          }
        ]
      }

  return (
    <div>
    <div>
        <Bar
          data={state}
          options={{
            title:{
              display:true,
              text:'Daily Weight Tracker',
              fontSize:20
            },
          }}
        />
      </div>
    </div>
  )
}

export default BarChart