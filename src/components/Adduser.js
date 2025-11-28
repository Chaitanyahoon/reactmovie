import React from "react";
import axios from "axios";

class Adduser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apidata: [],
      adding: false,
    };

    this.x1 = React.createRef();
    this.x2 = React.createRef();
    this.x3 = React.createRef();

    this.myfunction = this.myfunction.bind(this);
  }

  componentDidMount() {
    // Use relative path so CRA proxy forwards to your backend on port 3001
    axios
      .get("/users")
      .then((res) => {
        const data = res.data || [];
        this.setState({ apidata: data });
        console.log("Fetched users:", data);
      })
      .catch((err) => {
        console.error("Error fetching users:", err && err.toString());
      });
  }

  componentWillUnmount() {
    console.log("Adduser: component will unmount");
  }

  myfunction() {
    const val1 = this.x1.current?.value || "";
    const val2 = this.x2.current?.value || "";
    const val3 = this.x3.current?.value || "";

    console.log("Add user values:", val1, val2, val3);
    const payload = { name: val1, email: val2, extra: val3 };

    this.setState({ adding: true });
    axios
      .post("/users", payload)
      .then((res) => {
        console.log("Add user response:", res.data);
        // update list optimistically (if backend returns created user use it)
        const created = res.data || payload;
        this.setState((prev) => ({
          apidata: [created, ...prev.apidata],
          adding: false,
        }));
        // clear fields
        if (this.x1.current) this.x1.current.value = "";
        if (this.x2.current) this.x2.current.value = "";
        if (this.x3.current) this.x3.current.value = "";
      })
      .catch((err) => {
        console.error("Error adding user:", err && err.toString());
        this.setState({ adding: false });
        alert("Failed to add user. See console for details.");
      });
  }

  render() {
    return (
      <div className="container">
        <h1>Add user component</h1>

        <div style={{ marginBottom: 8 }}>
          <input ref={this.x1} type="text" placeholder="Name" />
          <input
            ref={this.x2}
            type="text"
            placeholder="Email"
            style={{ marginLeft: 8 }}
          />
          <input
            ref={this.x3}
            type="text"
            placeholder="Extra"
            style={{ marginLeft: 8 }}
          />
          <button
            onClick={this.myfunction}
            disabled={this.state.adding}
            style={{ marginLeft: 8 }}
          >
            {this.state.adding ? "Adding..." : "Add User"}
          </button>
        </div>

        <h2>Users</h2>
        <ul>
          {this.state.apidata.length === 0 && <li>No users found</li>}
          {this.state.apidata.map((u, idx) => (
            <li key={u.id || idx}>{u.name || u.email || JSON.stringify(u)}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Adduser;
