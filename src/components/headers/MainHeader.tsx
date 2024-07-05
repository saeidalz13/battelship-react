interface MainHeaderProps {
  text: string;
  color?: string;
}

const MainHeader = (props: MainHeaderProps) => {
  return <h1>{props.text}</h1>;
};

export default MainHeader;
