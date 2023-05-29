import {Image, Menu, MenuProps} from "antd";
import CardComponent from "../components/CardComponent";
import {HomeFilled} from "@ant-design/icons";
import {Link} from "react-router-dom";

const items: MenuProps['items'] = [
    {
        label: (
            <Image width={80} src="https://th.bing.com/th/id/R.3f471521f472d7b5f6242d4b7416c888?rik=dvi%2fJZIWxkEiEA&pid=ImgRaw&r=0" />
        ),
        key: 'Logo'
    },
    {
        label: ( <Link to={'/'}>Home Characters</Link>),
        key: 'home',
        icon: <HomeFilled />,
    }
];
function Home() {

    return (
        <div>
            <Menu mode="horizontal" items={items}/>
            <CardComponent />
        </div>
    );
}

export default Home;