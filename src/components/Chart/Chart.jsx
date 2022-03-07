import React, {} from 'react';
import { Line } from "react-chartjs-2/dist/index"
import * as moment from "moment/moment";

const Chart = ({items}) => {

    items.sort((item, item2) => {
        const a = new Date(item.date).getTime();
        const b = new Date(item2.date).getTime();
        return a < b ? -1 : a > b ? 1 : 0;
    });
//сортировать по дате, закинуть в лейбл(горизонталь)

    const options= {
        title:{
            display: false,
        },
        legend: {
            display: false,
        },
        maintainAspectRatio: false,
        elements: {
            point: {
                radius: 4,
            },
        },
    }

    const distanceData = items.map((x) => {return x.distance} ) ;
    const labels =  items.map( (x)=> {return moment(x.date).format("LL")} ) ;

    const data = {
        labels,
        datasets: [
            {
                data: distanceData,
                backgroundColor: "rgb(164,142,177)",
                borderColor: "rgba(255,99,132,0.5)",
                hoverBackgroundColor: "rgba(255,99,132,0.4)",
                hoverBorderColor: "rgba(255,99,132,1)",
                borderWidth: 2,
                label: `Было пройдено метров`
            },
        ],
    };

    return(
                <div >
                    { items.length > 0
                        ? <Line
                            style={{
                                height: "300px",
                                width: "1000px",
                                minWidth: "300px",
                                marginLeft: "50px",
                                paddingBottom: "5%"
                            }}
                            data={data}
                            options={options}
                        />
                        : null
                    }
               </div>
    )
};
export default Chart;