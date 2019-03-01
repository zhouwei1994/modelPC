import ajax from '@/config/ajax';



export default {
  simulation: (val) => ajax('/simulation', {
    val
  }),
}
