import { useEffect, useRef, useState } from "react";
import words from "../data/words";

function Wordle() {
  const keyboardRef = useRef<HTMLInputElement>(null);
  const [activeIndex, setActiveIndex] = useState<[number, number]>([0, 0]);
  const [word, setWord] = useState<string>("");
  const [backDoor, setBackDoor] = useState<number>(0);
  const [values, setValues] = useState(
    Array(6).fill(
      Array(5).fill({
        value: "",
        correct: undefined, //1: wrong,2:correct but wrong place,3:correct
      })
    )
  );
  useEffect(() => {
    setWord(words.pickWord());
  }, []);
  useEffect(() => {
    if (keyboardRef.current) {
      keyboardRef.current.focus();
    }
  }, [keyboardRef]);
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [values, backDoor]);
  // console.log(backDoor)

  const handleKeyDown = (ev: KeyboardEvent) => {
    if (ev.code === "Escape") {
      ev.preventDefault();
      if (backDoor > 10) {
        console.log("word", word);
        setBackDoor(0);
      } else {
        setBackDoor(backDoor + 1);
      }
    }
    if (ev.code.includes("Key")) {
      ev.preventDefault();
      const word = ev.code.replace("Key", "");
      // tmpVals[activeIndex[0]][activeIndex[1]] = word;
      const modifiedValues = values.map((rows, index) => {
        if (index !== activeIndex[0]) return rows;
        return rows.map(
          (item: { value: string; correct?: number }, index2: number) => {
            if (index2 === activeIndex[1]) return { ...item, value: word };
            return item;
          }
        );
      });

      setValues([...modifiedValues]);
      //control next active index
      handeNextActiveIndex([...modifiedValues]);
    }
  };
  const handeNextActiveIndex = (
    modifiedValues: { value: string; correct?: number }[][]
  ) => {
    const activeIndexTmp = [activeIndex[0], activeIndex[1]];
    if (activeIndexTmp[1] < 4) {
      setActiveIndex([activeIndexTmp[0], activeIndexTmp[1] + 1]);
    } else {
      handleCheckValue([...modifiedValues]);
    }
  };
  const handleCheckValue = (
    modifiedValues: { value: string; correct?: number }[][]
  ) => {
    const currentRow = activeIndex[0];
    let hasWrong = false;
    //check chars peer to peer
    const checkedValues = modifiedValues[currentRow].map(
      (item: { value: string; correct?: number }, index: number) => {
        if (item.value === word[index]) {
          return { ...item, correct: 3 };
        } else if (word.search(item.value) > -1) {
          hasWrong = true;
          return { ...item, correct: 2 };
        } else {
          hasWrong = true;
          return { ...item, correct: 1 };
        }
      }
    );
    const valuesTmp = modifiedValues.map((rows, index) => {
      if (currentRow === index) return checkedValues;
      return rows;
    });
    setValues(valuesTmp);
    //check if says correct ans.
    if (!hasWrong) {
      handleWin();
    } else {
      if (currentRow < 5) {
        setActiveIndex([currentRow + 1, 0]);
      } else {
        handleEndGame();
      }
    }
  };
  const handleWin = () => {
    setTimeout(() => {
      alert("you Win!");
      handleResetGame();
    }, 500);
  };
  const handleEndGame = () => {
    setTimeout(() => {
      alert(`you Loose! correct word was: ${word}`);
      handleResetGame();
    }, 200);
  };
  const handleResetGame = () => {
    setActiveIndex([0, 0]);
    setValues(
      Array(6).fill(
        Array(5).fill({
          value: "",
          correct: undefined, //1: wrong,2:correct but wrong place,3:correct
        })
      )
    );
    setWord(words.pickWord());
  };
  return (
    <div>
      <h1>WORDLE</h1>
      <input
        type="hidden"
        hidden
        style={{ display: "none" }}
        ref={keyboardRef}
      />
      <div className="mt-8 flex items-center justify-start flex-col gap-y-2">
        {Array(6)
          .fill("")
          .map((_, index) => {
            return (
              <div key={index} className="flex gap-x-2">
                {Array(5)
                  .fill("")
                  .map((_, index2) => {
                    return (
                      <div
                        key={index2}
                        className={`w-12 h-12 rounded-md flex items-center justify-center font-black
                        ${
                          values[index][index2].correct &&
                          "text-white !border !border-gray-200"
                        }
                       
                        ${
                          activeIndex[0] === index && activeIndex[1] === index2
                            ? "border-2 border-gray-900"
                            : "border border-gray-400"
                        }
                        ${values[index][index2].correct === 1 && "bg-gray-500"}
                        ${
                          values[index][index2].correct === 2 && "bg-yellow-500"
                        }
                        ${values[index][index2].correct === 3 && "bg-green-800"}
                         `}
                      >
                        <p>{values[index][index2].value}</p>
                      </div>
                    );
                  })}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Wordle;
