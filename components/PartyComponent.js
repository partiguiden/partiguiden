import Link from "next/link";
import Collapse from "@material-ui/core/Collapse";
import ButtonBase from "@material-ui/core/ButtonBase";
import { withStyles } from "@material-ui/core/styles";

const subjectStyles = theme => ({
  partyStandpoint: {
    marginBottom: "1.5rem",
    marginTop: "0.5rem",
    "& h3": {
      marginTop: "0.5rem"
    },
    "& h4": {
      margin: "0.5rem 0"
    },
    "& li": {
      fontSize: "1.125rem",
      listStyle: "none",
      position: "relative"
    },
    "& li + li": {
      marginTop: "0.75rem"
    },
    "& ul": {
      paddingLeft: "1rem"
    },
    "& button": {
      width: "100%",
      textAlign: "center",
      padding: "0.5rem 0",
      backgroundColor: theme.palette.primary.textContrast,
      boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.2)",
      transition: "background-color 0.4s ease-in-out",
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.08)"
      }
    }
  }
});

export default withStyles(subjectStyles)(
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = { visible: false };
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
      this.setState({
        visible: !this.state.visible
      });
    }

    renderInfo(data) {
      return (
        <div
          className="standpoints"
          key={`${this.props.party.name}${data.name}`}
        >
          <h4>{data.name}</h4>
          <ul>
            {data.opinions.map((opinion, index) => (
              <li
                className="partyOpinions"
                key={`${this.props.party.name}${data.name}${index}`}
              >
                {opinion}
              </li>
            ))}
          </ul>
          <Link href={`${data.url}`}>
            <a target="_blank" className="d-flex p-1 m-1">
              Läs mer på partiets hemsida
            </a>
          </Link>
        </div>
      );
    }

    render() {
      return (
        <div
          key={`${this.props.party.name}`}
          id={`${this.props.party.name}`}
          className={this.props.classes.partyStandpoint}
        >
          <ButtonBase onClick={this.handleClick}>
            <h3>{this.props.party.name}</h3>
          </ButtonBase>
          <Collapse in={this.state.visible}>
            {this.props.party.subjects.map(subject => this.renderInfo(subject))}
          </Collapse>
        </div>
      );
    }
  }
);
