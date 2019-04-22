/* Database */
import firebase from "../lib/db.js";

/* Next js components */
import { withRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";

/* Custom components */
import PartyComponent from "../components/PartiesStandpoints/PartyComponent";
import LoadCircle from "../components/LoadCircle";

export default withRouter(
  class Subject extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        partydata: [
          {
            name: "Socialdemokraterna",
            data: []
          },
          {
            name: "Moderaterna",
            data: []
          },
          {
            name: "Sverigedemokraterna",
            data: []
          },
          {
            name: "Centerpartiet",
            data: []
          },
          {
            name: "Vänsterpartiet",
            data: []
          },
          {
            name: "Kristdemokraterna",
            data: []
          },
          {
            name: "Liberalerna",
            data: []
          },
          {
            name: "Miljöpartiet",
            data: []
          }
        ]
      };
    }

    getIndex() {
      return [
        "Socialdemokraterna",
        "Moderaterna",
        "Sverigedemokraterna",
        "Centerpartiet",
        "Vänsterpartiet",
        "Kristdemokraterna",
        "Miljöpartiet"
      ];
    }

    componentDidMount() {
      this.getData();
    }

    static async getInitialProps({ ...props }) {
      const id = props.query.id;
      var result = [];
      var output = [];
      result = await new Promise((resolve, reject) => {
        firebase
          .firestore()
          .collection("Data")
          .doc("Pages")
          .onSnapshot({ includeMetadataChanges: true }, function(snapshot) {
            resolve(snapshot.data()[id]);
          });
      });
      return { data: result };
    }

    async fetchFromDatabase(party, index) {
      let tags = this.props.data.opinions;
      let subject = await new Promise((resolve, reject) => {
        firebase
          .firestore()
          .collection("Parties")
          .doc(party)
          .onSnapshot({ includeMetadataChanges: true }, function(snapshot) {
            var data = [];
            Object.keys(snapshot.data()).forEach(map => {
              if (tags.indexOf(snapshot.data()[map].name) != -1) {
                data.push(snapshot.data()[map]);
              }
            });
            resolve(data);
          });
      }).catch(err => {
        // No data found
      });
      this.state.partydata[index].data = subject;
      return subject;
    }

    async getData() {
      let parties = this.getIndex();
      var output = [];

      const req = parties.map(async (party, index) => {
        await this.fetchFromDatabase(party, index);
      });

      Promise.all(req).then(() => {
        this.setState({
          loading: false
        });
      });
    }

    render() {
      const { data } = this.props;
      const { partydata } = this.state;
      return (
        <React.Fragment>
          <Head>
            <title>{data.name} | Partiguiden.nu</title>
            <meta
              name="description"
              content={`Vad tar Sveriges partier för ståndpunkter inom ämnet ${
                data.name
              } Här hittar du informationen du behöver för att kunna jämföra och hitta det parti du sympatiserar med mest! `}
            />
          </Head>
          <div className="list-title text-center">
            <h1>{data.name}</h1>
          </div>

          {this.state.loading ? (
            <LoadCircle />
          ) : (
            <div className="container">
              {partydata.map(party => {
                if (party.data.length > 0) {
                  return <PartyComponent key={party.name} party={party} />;
                }
              })}
            </div>
          )}
        </React.Fragment>
      );
    }
  }
);
