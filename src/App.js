// Hooks
import { useState, useRef, useCallback, } from "react";

// Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Reactstrap, Bootstrap and CSS
import { Card, CardBody, Container, Button, Col, Row } from "reactstrap";
import "bootstrap/dist/css/bootstrap.css";
import './App.css';

// Unique Keys
import {v4 as getKey} from 'uuid';

// Components
import Icon from "./components/Icon";

// Functions
import { memoHighlightWinner } from "./functions";


const slotsArr = new Array(9).fill("empty");
const MIN_TURN_FOR_WINNER = 5;
const WINNING_SLOTS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const App = () => {
  
  const [mark, setMarkSwitch] = useState("cross");
  const [winMessage, setWinMessage] = useState("");
  const [winnerSlots, setWinnerSlots] = useState([]);
  const turn = useRef(0);
  const cardNode = useRef(null);

  const reloadGame = useCallback(() => {
    setMarkSwitch("cross");
    setWinMessage("");
    setWinnerSlots([]);
    slotsArr.fill("empty");
    turn.current = 0;
  }, []); 

  const checkTheWinner = useCallback(turn => {

    if (turn >= 9) {
      setWinMessage("It's a Tie.");
      return;
    }

    for (let i = 0; i < WINNING_SLOTS.length; i++) {
      const [a, b, c] = WINNING_SLOTS[i];
      if (
        slotsArr[a] !== "empty" && 
        slotsArr[a] === slotsArr[b] &&
        slotsArr[a] === slotsArr[c] 
      ) {
        setWinMessage(`${slotsArr[a]} Won`);
        setWinnerSlots([a, b, c]);
      }
    }
  }, []);

  const markSlot = useCallback(index => {

    if (winMessage) {
      return;
    }
  
    turn.current++;
    
    if (slotsArr[index] === "empty") {
      slotsArr[index] = mark === "cross" ? mark : "circle";
      setMarkSwitch(mark === "cross" ? "circle" : "cross");
    }
    else {
      return toast("Already filled", {type: "error"});
    }

    if (turn.current >= MIN_TURN_FOR_WINNER) {
      checkTheWinner(turn.current);
    }
  }, [mark, checkTheWinner, winMessage]);

  return (
    <Container className="p-5">
      <ToastContainer position="bottom-center" />
      <Row>
        <Col md={6} className="offset-md-3">
          {winMessage ? (
            <div className="mb-2 mt-2">
              <h1 className="text-success text-uppercase text-center">
                {winMessage}
              </h1>
            </div>
          ) : (
            <h1 className="text-center text-warning">
              {mark === 'cross' ? "Cross" : "Circle"} Turns
            </h1>
          )}

          <div className="mb-5 mt-5">
            <Button color="primary" block onClick={reloadGame}>
              Reload the Game
            </Button>
          </div>

          <div className="grid">
            {slotsArr.map((slot, index) => (
              <Card 
                key={getKey()}
                style={{"cursor" : !winMessage ? "pointer" : ""}}
                innerRef={cardNode}
                color={memoHighlightWinner(index, winnerSlots)} 
                onClick={() => markSlot(index)}
              >
                <CardBody className="box">
                  <Icon name={slot} />
                </CardBody>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;