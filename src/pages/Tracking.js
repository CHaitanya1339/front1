import React, { useEffect, useState } from 'react';
import Navbar from '../layout/Navbar'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import avatar02 from "../assets/img/im2.jpg";
import avatar01 from "../assets/img/im3.jpg";
import avatar03 from "../assets/img/im1.jpg";
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';


var c = 0
let work = []
let exercises = []
let dic = { 1: "Cardiovascular Workouts", 2: "Strength Training", 3: "Flexibility and Mobility", 4: "Group Fitness", 5: "Outdoor Activities", 6: "Mind-Body Exercises" }
let exercise_list = {
  1: ["Running/jogging on a treadmill or outdoors", "Cycling (indoor or outdoor)", "Jumping rope", "High-intensity interval training (HIIT)", "Stair climbing", "Rowing"],
  2: ["Weightlifting (using dumbbells, barbells, or weight machines)", "Bodyweight exercises (push-ups, squats, lunges, planks)", "Resistance band exercises", "Kettlebell workouts", "Circuit training", "Powerlifting", "CrossFit-style workouts"],
  3: ["Stretching exercises", "Yoga poses and flows", "Pilates", "Foam rolling", "Mobility drills", "Dynamic warm-up exercises",],
  4: ["Zumba or dance fitness", "Aerobics", "Kickboxing", "Boot camp-style workouts", "Barre workouts", "Spinning/cycling classes", "Circuit training classes"],
  5: ["Swimming", "Rock climbing", "Kayaking/canoeing", "Stand-up paddleboarding (SUP)", "Tennis", "Soccer"],
  6: ["Meditation", "Tai Chi", "Qi Gong", "Mindful yoga", "Breathing exercises"]
}

function AddExercises(props) {
  const user = JSON.parse(localStorage.getItem('user'));
  const uid = user.id;

  let option = ``
  const [exercise, setexercise] = useState({
    id: '',
    workout_id: '',
    name: '',
    description: '',
  });

 

  const addopt = (e) => {
    if (c == 0) {
      c += 1
      option = `<option value="">Select a workout</option>`
      for (let i of work) {

        option += `<option value=${i.id}>${dic[String(i.id).slice(1, 2)]}</option>`
      }
      document.getElementById(e.target.name).innerHTML = option
    }
  }



  useEffect(() => {

    axios.get(`http://localhost:8081/users/${uid}/workouts`)
      .then(res => {
        work = res.data
        console.log(work)
      })
      .catch(err => console.log(err));
  }, []);



  const onInputChange = (e) => {
    if (e.target.name === "name") {
      let vals = e.target.value.split("#")
      setexercise({ ...exercise, ['id']: exercise.workout_id + String(vals[1]), [e.target.name]: vals[0] });
    }
    else {
      setexercise({ ...exercise, [e.target.name]: e.target.value }
      )
    }

  };

  const addexercise = (e) => {
    let temp = `<option value="">Select a Exercise</option>`
    console.log(e.target.name)
    let l = exercise_list[String(e.target.value).slice(1, 2)].length
    for (let i = 0; i < l; i++) {
      temp += `<option value='${exercise_list[String(e.target.value).slice(1, 2)][i] + "#" + String(i + 1)}'>${exercise_list[String(e.target.value).slice(1, 2)][i]}</option>`
    }
    document.getElementById('name').innerHTML = temp

  }

  const handelSubmit = async (e) => {
    e.preventDefault();
    const w_id = exercise.workout_id
    try {

      const response = await axios.post(
        `http://localhost:8081/workouts/${w_id}/exercises`,
        exercise);
      setexercise({ ...exercise, ['description']: "" });
      console.log(response);// Handle the response as needed

      alert("Exercise Added Successfully");
    } catch (error) {
      console.error(error);
      alert("Failed")
    }

  }



  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Exercise
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <form onSubmit={handelSubmit}>
            <div className="mb-3">
              <label htmlFor="id" className="form-label">
                Workouts
              </label>
              <select
                className="form-control"
                id="workout_id"
                name="workout_id"
                onChange={function (event) { onInputChange(event); addexercise(event) }}
                onClick={addopt}
              >
                <option value="">Select a workout</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="id" className="form-label">
                Exercise
              </label>
              <select
                className="form-control"
                id="name"
                name="name"
                onChange={onInputChange}
              >
                <option value="">Select a workout First</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="notes" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={exercise.description}
                onChange={onInputChange}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Add Exercise
            </button>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}




function ExerciseDisplay(props) {
  var status=0;
  const [updateShow, setUpdateShow] = useState({
    uShow: false,
    updateId: ""
  });

  var option = ``

  const addopt = (e) => {
    if (c == 0) {
      c += 1
      option = `<option value="">Select a workout</option>`
      for (let i of work) {

        option += `<option value=${i.id}>${dic[String(i.id).slice(1, 2)]}</option>`
      }
      document.getElementById(e.target.name).innerHTML = option
    }
  }

  const showeditform = (e) => {
    console.log(exercises)
    setUpdateShow({ ...updateShow, ["updateId"]: e.target.name, ["uShow"]: true })
  }

  const removeExercise = async (e) => {
    let temp = e.target.id.split("#")
    axios.delete(`http://localhost:8081/exercises/${temp[1]}`);
    status=1
    let select = document.getElementById("workout_id");
    var option;
    for (var i=0; i<select.options.length; i++) {
      option = select.options[i];
    
      if (option.value == temp[1]) {
         option.setAttribute('selected', true);

         break; 
      } 
    }
    const event = new Event("change", { bubbles: true });
    select.dispatchEvent(event);


  }

  const displayexercise = async (e) => {
    if(status===1){
      alert("Exercise Deleted")
      status=0
    }
    
    axios.get(`http://localhost:8081/workouts/${e.target.value}/exercises`)
      .then(res => {
        exercises = res.data
        console.log(exercises)
        option = ``
        for (let i of exercises) {


          option += `<tr><th scope="row">${i.id}</th><td>${i.workout_id}</td><td>${i.name}</td><td>${i.description}</td>
          <td>
          <button type="button" class="btn btn-info" id=${i.id} name=${i.id} }>
          Edit</button>
          &nbsp; <button type="button" class="btn btn-danger" name=${e} id=${'remove' + '#' + String(i.id)}>X</button>
          </td></tr>`;



        }

        console.log(option)
        document.getElementById("exercisetable").innerHTML = option

        for (let i of exercises) {
          const element = document.getElementById(i.id).onclick = showeditform
          document.getElementById('remove' + '#' + String(i.id)).onclick = removeExercise
        }
      })
      .catch(err => console.log(err));

  }

  return (
    <>
      <Modal
        size="xl"
        {...props}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Exercises
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="id" className="form-label" style={{ fontWeight: "bold" }}>
              Workouts
            </label>
            <select
              className="form-control"
              id="workout_id"
              name="workout_id"
              onChange={displayexercise}
              onClick={addopt}
            >
              <option value="">Select a workout</option>
            </select>
          </div>

          <table className="table table-hover" >
            <thead className="table-light" >
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Workout ID</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Perform Action</th>
              </tr>
            </thead>
            <tbody id="exercisetable">
              <tr>
                <th scope="col" colSpan="5">Select a Workout</th>
              </tr>

            </tbody>
            <UpdateExercise
              show={updateShow.uShow}
              onHide={() => { setUpdateShow({ ["uShow"]: false }); }}
              id={updateShow.updateId}
            />
          </table>
        </Modal.Body>
      </Modal>
    </>
  );
}

let updatex = {}
function UpdateExercise(props) {
  for (let i of exercises) {
    if (i.id == props.id) {
      updatex = i
    }
  }

  let list = []
  let index = String(updatex.workout_id).slice(1, 2)
  for (let i in exercise_list[index]) {
    list.push(exercise_list[index][i])

  }
 
  const [updateExercise, setUpdateExercise] = useState({
    id:'',
    workout_id: '',
    name: '',
    description: '',
  })

  
  const onInputChange = (e) => {
    if (e.target.name === "name") {
      let vals = document.getElementById(e.target.name).selectedIndex;
      setUpdateExercise({ ...updateExercise, ['id']: updatex.workout_id + String(vals), [e.target.name]: e.target.value });
    }
    else {
      setUpdateExercise({ ...updateExercise, [e.target.name]: e.target.value })

    }

  };


  const saveChanges = () => {
    if (updateExercise.id == '') {
      setUpdateExercise({ ...updateExercise, ['id']: updatex.id, ['name']: updatex.name, ['workout_id']: updatex.workout_id })

    }
    if (updatex.description == '') {
      setUpdateExercise({ ...updateExercise, ["description"]: updatex.deprication, ['workout_id']: updatex.workout_id })

    }
    console.log(updateExercise)
  }


  return (
    <>
      <Modal {...props}>
        <Modal.Header closeButton>
          <Modal.Title>Update Exercise</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form >
              <div className="mb-3">
                <label htmlFor="Name" className="form-label">
                  Workout
                </label>
                <input
                  type={"text"}
                  className="form-control"
                  value={dic[String(updatex.workout_id).slice(1, 2)]}
                  readOnly={true}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="id" className="form-label">
                  Exercise
                </label>
                <select
                  className="form-control"
                  id="name"
                  name="name"
                  onChange={onInputChange}
                >
                  {
                    list.map((exer, ind) => (
                      exer == updatex.name ? <option value={exer} id={ind} selected>{exer}</option> : <option value={exer}>{exer}</option>
                    ))
                  }

                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="notes" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  value={updateExercise.description}
                  onChange={onInputChange}
                ></textarea>
              </div>

              <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                  Close
                </Button>
                <Button variant="primary" onClick={() => { props.onHide(); saveChanges() }}>
                  Save Changes
                </Button>
              </Modal.Footer>

            </form>
          </div>
        </Modal.Body>
      </Modal>

    </>


  );
}



const Tracking = () => {
  const hover = (e) => {
    console.log("hy")
    console.log(e)
    document.getElementsByClassName(e.target.name).style.boxShadow = "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)";
  }

  const dehover = (e) => {
    console.log("hy")
    console.log(e.target.name)
    document.getElementsByClassName(e.target.name).style.boxShadow = "";
  }

  const [modalShow, setModalShow] = React.useState(false);
  const [lgShow, setLgShow] = useState(false);

  const decount = () => {
    c = 0
  }

  return (
    <div>
      <header style={{ marginTop: "10px" }} >
        <Navbar />
      </header>
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <Card style={{ width: '18rem', border: "2px solid rgb(207, 117, 249)" }}>
              <Card.Img variant="top" src={avatar03} />
              <Card.Body>
                <Card.Title>Transform Yourself</Card.Title>
                <Card.Text>
                  Take the Next Step Towards a Healthier You: Activate Exercise Now!
                </Card.Text>
                <Button variant="primary" onClick={() => setModalShow(true)}>
                  Add Exercise
                </Button>

                <AddExercises
                  show={modalShow}
                  onHide={() => {setModalShow(false); decount() }}
                />
              </Card.Body>
            </Card>
          </div>
          <div className='col'>
            <Card style={{ width: '18rem', border: "2px solid rgb(207, 117, 249)" }}>
              <Card.Img variant="top" src={avatar01} />
              <Card.Body>
                <Card.Title>Check Progress</Card.Title>
                <Card.Text>
                  Put Your Hard Work on Display: Show Your Exercise All Achievements!
                </Card.Text>
                <Button variant="primary" onClick={() => setLgShow(true)}>Show All Exercise</Button>
                <ExerciseDisplay
                  show={lgShow}
                  onHide={() => { setLgShow(false); decount() }}
                />

              </Card.Body>
            </Card>
          </div>
          <div className='col'>
            <Card name="card1" id="card1" className="card1" style={{ width: '18rem', border: "2px solid rgb(207, 117, 249)" }}>
              <Card.Img variant="top" src={avatar02} />
              <Card.Body>
                <Card.Title>Redefine Yourself</Card.Title>
                <Card.Text>
                  Customize Your Workout: Delete and Refine Your Exercise Selections!
                </Card.Text>
                <Button variant="primary">Update and Delete</Button>
              </Card.Body>
            </Card>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Tracking