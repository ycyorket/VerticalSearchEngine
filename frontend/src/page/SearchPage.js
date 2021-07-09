import {Button, List, Input, Menu, Timeline, Space} from 'antd';
import React, {useState} from "react";
import {SearchOutlined, InfoOutlined, ForkOutlined, HistoryOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import axios from 'axios';
import debounce from '../util/performance';

const {Search} = Input;

const shuffle = (arr) => {
    let res = JSON.parse(JSON.stringify(arr))
    res.sort(function(){return Math.random()>0.5?-1:1;})
    return res
}

let ListItem = (props) => {
    let [hover, setHover] = useState(false);
    let hoverStyle = {
        color: 'black',
        fontSize: 'large',
        height: "100%",
        width: "100%"
    }
    let style = {
        color: "#333",
        height: "100%",
        width: "100%"
    }
    console.log(props.item)
    let onClick = (e) => {
        if(props.state.feedbackLevel === 1){
            let sufs = shuffle(props.state.suffices);
            props.setState({
                question: props.item,
                lastDisease: props.item,
                feedbackLevel: 2,
                feedback: sufs.slice(0, 6).map((suffix)=>{return props.item + suffix})
            })
        }
        else{
            props.setState({question: props.item})
            setTimeout(props.search, 200)
        }
    }
    return <div onClick={onClick} onMouseOver={()=>{setHover(true)}} onMouseOut={()=>{setHover(false)}} style={hover? hoverStyle: style}>
        {props.item}
    </div>
}

class AppSearch extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            defaultResult: "无结果返回",
            lastQuestion: "",
            searched: false,
            question: "",
            result: "无数据\n无数据\n无数据\n无数据\n无数据\n无数据\n无数据\n无数据\n",
            feedback: [],
            suffices: [
                '是什么病？',
                '的病因是？',
                '是什么科的疾病？',
                '应该吃什么食物？',
                '有什么忌食？',
                '应该吃什么药？',
                '如何诊断？',
                '如何治疗？',
                '如何护理？',
                '如何预防?',
                '的临床检查方法是？',
                '的发病率是多少？',
                '的治愈率是多少？',
                '的易感人群有哪些？',
                '治疗开销有多大？',
                '可能会有哪些并发症？',
                '的治疗周期有多长？',
                '的传播方式有哪些？',
                '治疗是否纳入医保？'
            ],
            showFeedback: false,
            feedbackLevel: 1,
            lastDisease: ''
        };
        this.queryDiseases = debounce(this.queryDiseases, 500);
    };

    AppLoading = () => {
        let res = this.state.result;
        return <div>{res.split('\n').length <= 10?
            <p>{res}</p>:
            <p>{res.split('\n').slice(0, 10).join("、")+"等。"}</p>
        }</div>
    }

    // @搜索
    onSearch = () => {
        let str = this.state.question.replace(/(^\s*)|(\s*$)/g, '')
        if(str === '' || str === undefined || str === null){
            return
        }
        let form = {
            'question': this.state.question
        }
        const lazyRes = "啊……这种问法还不清楚是什么意思呢……"
        this.setState({
            searched: true,
            showFeedback: false,
            result: '查询中',
            lastQuestion: this.state.question
        })
        axios.post('http://120.55.161.100:5000/answer', JSON.stringify(form), {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then( res =>{
                this.setState({
                    result: res.data.answer || '没收到是怎么回事'
                })
                if(res.data.answer && res.data.answer !== lazyRes){
                    let record = {
                        question: this.state.lastQuestion,
                        answer: res.data.answer
                    }
                    this.props.addHistory(record)
                }
            })
            .catch(
                res=>{
                    console.log(res)
                    this.setState({
                        result: '查询异常'
                    })
                }
            )
    }

    adjustFeedback = () => {
        let s = {}
        if(this.state.feedbackLevel === 1 ||
            (this.state.question !== "" && this.state.question === this.state.lastDisease)){
            let sufs = shuffle(this.state.suffices)
            if(this.state.feedback.includes(this.state.question)){
                s.feedbackLevel = 2
                s.feedback = sufs.slice(0, 6).map((suffix)=>{return this.state.question + suffix})
                s.lastDisease = this.state.question
            }
        } else if(!this.state.question.includes(this.state.lastDisease))
            s.feedbackLevel = 1
        this.setState(s)
    }

    // @请求疾病
    queryDiseases = (form) => {
        axios.post('http://120.55.161.100:5000/diseases', JSON.stringify(form), {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then( res =>{
                let diseases = res.data.diseases
                if(!res.data.diseases || res.data.diseases.length === 0)
                    diseases = ['无相关疾病']
                this.setState({
                    feedback: diseases,
                    showFeedback: true
                })
                this.adjustFeedback()
            })
            .catch(
                res=>{
                    console.log(res)
                }
            )
    }

    onSearchChange = (e) => {
        let value = e.target.value
        let state = {question: value}
        let form = {
            contains: value
        }
        if(value === "")
            state.showFeedback = false
        if(this.state.feedbackLevel === 1)
            this.queryDiseases(form);
        this.adjustFeedback()
        this.setState(state)
    }

    render(){
        return (
            <div className="app-search-container">
                <Space direction="vertical" style={{width: "100%", marginTop: "3vh"}} align='center'>
                    <Search placeholder="输入您的问题" allowClear value={this.state.question}
                            onChange={e=>{this.onSearchChange(e)}}
                            onSearch={this.onSearch} style={{width: "80vw", padding: "3vh auto"}} />
                    {this.state.showFeedback &&
                    <List
                        bordered
                        dataSource={this.state.feedback}
                        renderItem={item => (
                            <List.Item>
                                <ListItem item={item} state={this.state} setState={this.setState.bind(this)} search={this.     onSearch.bind(this)}/>
                            </List.Item>
                        )}
                        size="small"
                        style={{width: "80vw", padding: "2vh auto"}}
                    />}
                    {
                        this.state.searched&&
                        <div style={{width: '80vw', margin: '5vh auto', alignItems: 'flex-start'}}>
                            <Space direction="vertical" style={{width: '100%'}}>
                                <div style={{textAlign: "left", fontSize: "1rem", display: "flex", flexDirection: "horizontal"}}>
                                    <div style={{boxShadow: "0px 0px 4px #2593fc", padding:"1ch", fontWeight: "bold", textAlign: "center", flexGrow: 1}}>参考解答</div>
                                    <div style={{flexGrow: 7}}/>
                                </div>
                                <div style={{textAlign: "left", lineHeight: "2rem", fontSize: "1rem", padding: "2ch", boxShadow: "0px 0px 4px #2593fc"}}>
                                    {this.AppLoading()}
                                </div>
                            </Space>
                        </div>
                    }
                </Space>
            </div>
        )
    }
}

export default class SearchPage extends React.Component {
    state = {
        current: 'search',
        history: []
    };

    AppExamples = () => {
        let aboutDisease = ['简介', '病因', '科室所属', '忌食宜食', '用药', '疾病建议', '诊断方式', '治疗方式', '护理方式', '预防手段',
            '临床检查手段', '治疗手段', '发病率', '治愈率', '易感人群', '开销', '并发症', '治疗周期', '传染性', '医保']
        return (
            <div style={{width: "80vw", margin: "5vh auto", textAlign: "left"}}>
                <h2 style={{outlineBottom: "black solid 0.5ch"}}>我们可以解决以下问题：</h2>
                <div>
                    <h2>疾病诊断</h2>
                    <p style={{textIndent: '4ch'}}>根据症状查询疾病</p>
                    <p style={{textIndent: '4ch'}}>例如</p>
                    <p style={{textIndent: '8ch'}}><strong>输入：</strong>头疼是什么病</p>
                    <p style={{textIndent: '8ch'}}><strong>输出：</strong>小儿加压素分泌过多综合征 多形红斑 抑郁症 斜视 复发性多软骨炎 恶性肿瘤 化脓性指头炎 克-雅氏病性痴呆 单次发作抑郁症 非火器性颅脑开放伤 脉络丛乳头状瘤 外伤性硬膜下积液 小儿急性上呼吸道感染 急性和亚急性硬脑膜下血肿 星形细胞瘤 急性脑内血肿 小叶增生 肥大细胞增多症 闭经性头痛 功能性胃肠病 小儿急性血行播散型肺结核 外伤性脑脓肿 慢性肺源性心脏病 室管膜肿瘤 小脑扁桃体下疝 慢性硬脑膜下血肿 急性硬脑膜外血肿 脑震荡 急性及亚急性脑内血肿 乳腺增生 外伤后脑脂肪栓塞 相对性红细胞增多症 继发性红细胞增多症 拟除虫菊酯类杀虫药中毒 外伤性硬脑膜下积液 内隐斜 脑干肿瘤 甲状腺相关眼病</p>
                    <h2>疾病了解</h2>
                    <p style={{textIndent: '4ch'}}>查询某个特定疾病的{aboutDisease.join('、')}等相关信息</p>
                    <p style={{textIndent: '4ch'}}>例如</p>
                    <p style={{textIndent: '8ch'}}><strong>输入：</strong>感冒时应该吃什么</p>
                    <p style={{textIndent: '8ch'}}><strong>输出：</strong>1、多食新鲜蔬菜和水果，补充充足维生素； 2、多食富含优质蛋白质的食物，增强身体抵抗力； 3、多食清淡易消化的流质饮食。</p>
                    <h2>疾病群览</h2>
                    <p style={{textIndent: '4ch'}}>根据疾病的所属类别查询所属的所有疾病</p>
                    <p style={{textIndent: '4ch'}}>例如</p>
                    <p style={{textIndent: '8ch'}}><strong>输入：</strong>心理疾病有哪些</p>
                    <p style={{textIndent: '8ch'}}><strong>输出：</strong>绝经与抑郁症 非器质性性乐高潮障碍 考后综合症 性障碍 露阴癖 情感性交叉擦腿症 性欲减退 小儿抽动秽语综合征 小儿孤独症 网络成瘾 童年情绪障碍 遗忘综合征 疑病症 抑郁症 性厌恶 屏幕脸 信息成瘾 非器质性性欲减退 成人多动症 恋物癖 窥阴癖 偏执状态 Asperger综合征 童年社会功能障碍 性冷淡 性病神经症 网瘾 心理疾病 性心理障碍 异性装扮癖 深海恐惧症 谵妄综合征及有关疾病 恋童癖 应激反应及适应障碍 神经性厌食症与神经性贪食症</p>
                </div>
            </div>
        )
    }

    AppHistory = () => {
        let clear = (event) => {
            this.setState({
                history: []
            })
            localStorage.setItem('history', JSON.stringify([]))
        }
        return (
            <div>
                <Timeline style={{width: "80vw", margin: "5vh auto", textAlign: "left"}}>
                    <Button onClick={clear} style={{marginBottom: "3vh"}}>清除历史记录</Button>
                    {this.state.history.map(
                        (item, index) => {
                            return (
                                <Timeline.Item key={index}>
                                    <p>Q: {item.question}</p>
                                    <p>A: {item.answer}</p>
                                </Timeline.Item>)
                        }
                    )}
                    {this.state.history.length === 0 && <Timeline.Item>暂无历史记录</Timeline.Item>}
                </Timeline>
            </div>
        )
    }

    AppAboutus = () => {
        return (
            <div style={{marginTop: "30px"}}>Made by 常博宇，孙恺元，杨琛</div>
        )
    }

    handleClick = e => {
        this.setState({ current: e.key });
    };

    componentWillMount() {
        let history = localStorage.getItem('history')
        if(history)
            try{
                history = JSON.parse(history)
            }catch(e){
                history = []
            }
        this.setState({
            history: history || []
        })
    }

    render() {
        const { current } = this.state;
        const addHistory = (record) =>{
            this.state.history.unshift(record)
            localStorage.setItem('history', this.state.history)
        }
        return (
            <div className="app-menu">
                <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
                    <Menu.Item key="search" icon={<SearchOutlined />}>
                        医学检索
                    </Menu.Item>
                    <Menu.Item key="example" icon={<InfoOutlined />}>
                        提问示例
                    </Menu.Item>
                    <Menu.Item key="history" icon={<HistoryOutlined />}>
                        回答记录
                    </Menu.Item>
                    <Menu.Item key="aboutus" icon={<ForkOutlined />}>
                        关于我们
                    </Menu.Item>
                </Menu>
                {this.state.current==="search" && <AppSearch addHistory={addHistory}></AppSearch>}
                {this.state.current==="example" && this.AppExamples()}
                {this.state.current==="history" && this.AppHistory()}
                {this.state.current==="aboutus" && this.AppAboutus()}
            </div>
        );
  }
}