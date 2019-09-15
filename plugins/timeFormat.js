// 时间过滤器
import Moment from 'moment';


export const timeFormat = function(time){
    
        const date = new Date(time)
      
        return Moment(date).format('YYYY-MM-DD HH:mm')
      
}