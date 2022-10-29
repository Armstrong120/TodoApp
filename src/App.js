import React from 'react';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
// import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';



//UI完了
//入力したらtodoItemに並ぶ
//チェック入れた内容がDoneに移動
//Todoの分を消す
//Allが一番最後
//Allを最初に作ってフィルターするのもあり
//const [todos, setTodos] =  [ {id: 1, text: "todo", done: false}, {id: 1, text: "todo", done: false},  {id: 1, text: "todo", done: false}]
//check押したとき
//各todoのdone を true にする
//Allタブ
//todosを全部出す
//Todoタブ
//doneがfalseのリストのみ抽出する
//Doneタブ
//doneがtrueのリストのみ抽出する


function Todo() {
  const [jobs, setJobs] = React.useState([]);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //checkに変更する配列を渡す。jobにjobsの配列全てを渡し、checkとjobのidが一致したらjobのdoneを反転。
  //addJobにjob全てを返す。最期にsetJobsをaddJobで上書き  
  const checkJob = check => {
    const addJob = jobs.map(job => {
      if (check.id === job.id) {
        job.done = !job.done;
      }
      return job;
    });
    setJobs(addJob);
  };

  return (
    <Box sx={{ margin: 4, borderRadius: 2, boxShadow: 3 }}>

      <Box display="flex" flexDirection={"row"} alignItems="center" sx={{ backgroundColor: 'rgb(238, 238, 238)', borderRadius: '8px 8px 0 0', padding: '10px', fontSize: 20, fontWeight: 'medium' }}>
        <AccessibilityNewIcon sx={{ paddingRight: '10px' }} className="icon" />
        React ToDo
      </Box>

      {/* Inputコンポーネントで入力した内容textを受け取り、jobs配列のtextに保存 */}
      <Input sendText={text => { setJobs([...jobs, { id: jobs.length + 1, text, done: false }]); console.log(jobs) }} />

      {/* handleChangeでTabsの描画更新。indexでTabの値を保存、TodoItemへ */}
      <Filter sendValue={handleChange} index={value} />

      {/* Filterコンポで保存されたvalueをsendTabで送信。 */}
      <TodoItem sendTab={value} items={jobs} confirmCheck={checkJob} />
    </Box>
  );
}

function Input({ sendText }) {
  const [text, setText] = React.useState('');

  return (
    <Box sx={{ padding: '10px', borderBottom: 1, borderColor: 'rgb(233, 233, 233)' }}>
      <TextField
        placeholder="Enter to add"
        fullWidth
        size="small"
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyPress={e => {
          if (e.key === 'Enter') {
            sendText(text);
            setText('');
          }
        }}
      />
    </Box>
  );
}

function Filter({ sendValue, index }) {
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      {/* Tabは自動的に番号を振ってくれる。 */}
      {/* indexでTabの値送信。sendValueでTabsの描画更新。 */}
      <Tabs value={index} onChange={sendValue} aria-label="basic tabs example" centered>
        <Tab sx={{ textTransform: 'none', "&:hover": { backgroundColor: 'rgb(238, 238, 238)' } }} label="All" />
        <Tab sx={{ textTransform: 'none', "&:hover": { backgroundColor: 'rgb(238, 238, 238)' } }} label="ToDo" />
        <Tab sx={{ textTransform: 'none', "&:hover": { backgroundColor: 'rgb(238, 238, 238)' } }} label="Done" />
      </Tabs>
    </Box>
  );
}

function Items({ jobs, check }) {

  //CheckboxのonChange処理が走ると、対象の配列をTodoItemコンポへ飛ばす

  return (
    <Box>
      {jobs.map((element, index) =>
        <Box key={index} display="flex" flexDirection={"row"} alignItems="center" sx={{ width: 'calc(100% + 5px)', paddingLeft: '11px' }}>
          <FormControlLabel sx={{ width: "100%", borderBottom: 1, borderColor: 'rgb(233, 233, 233)', '&:hover': { backgroundColor: 'rgb(238, 238, 238)' } }}
            control={<Checkbox size="small" color="default" onChange={() => { check(element); }} checked={element.done} />}
            label={element.text}
          />
        </Box>
      )}
    </Box>
  );
}

function TodoItem({ sendTab, items, confirmCheck }) {
  let item = [];
  if (sendTab === 0) {
    item = items
  } else if (sendTab === 1) {
    item = items.filter(job => job.done === false)
  } else if (sendTab === 2) {
    item = items.filter(job => job.done === true)
  }

  return (
    <Box>
      <Items jobs={item} check={confirmCheck} />
      <Box sx={{ padding: '10px' }}>
        {item.length} items
      </Box>
    </Box>
  );
}

function App() {
  return (
    <Todo />
  );
}

export default App;