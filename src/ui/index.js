import Tost, {successTost, errorTost, warnTost, infoTost} from './tost'
import Ico from './ico';
import Panel from './panel'
import LoadingModal from './loadingModal'

const Tosts = {successTost, errorTost, warnTost, infoTost}
const tost = Tost
const tosts = Tosts
export {
    Tost,Tosts,tost,tosts,// 顶部提示消息
    Ico,
    Panel,
    LoadingModal
}
