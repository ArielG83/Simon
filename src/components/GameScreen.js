import React, { useState, useEffect } from 'react';
import { 
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    Dimensions,
} from 'react-native';
import Sound from 'react-native-sound';
import WithScore from '../HOC/WithScore';
import BoardBtn from './BoardBtn';
import TopScoreDialog from './TopScoreDialog';
import { timeout } from '../utils';

const boardBtns = ['yellow', 'blue', 'red', 'green']
const sounds = {
    red: new Sound('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3', Sound.MAIN_BUNDLE, (error) => { if (error) { console.log(error) }}),
    green: new Sound('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3', Sound.MAIN_BUNDLE, (error) => { if (error) { console.log(error) }}),
    yellow: new Sound('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3', Sound.MAIN_BUNDLE, (error) => { if (error) { console.log(error) }}),
    blue: new Sound('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3', Sound.MAIN_BUNDLE, (error) => { if (error) { console.log(error) }}),
    wrong: new Sound ('http://www.freesound.org/data/previews/331/331912_3248244-lq.mp3',Sound.MAIN_BUNDLE, (error) => { if (error) { console.log(error) }}),
}

const screenWidth = Math.round(Dimensions.get('window').width);

const GameScreen = ({ actions, navigation, topTen }) => {
    const [btnOpacity, setBtnOpacity] = useState({
        red: false,
        green: false,
        yellow: false,
        blue: false,
    });
    const [gameStarted, setGameStarted] = useState(false);
    const [sequence, setSequence] = useState([]);
    const [userSequence, setUserSequence] = useState([]);
    const [score, setScore] = useState(0);
    const [name, setName] = useState('');
    const [dialogVisible, setDialogVisible] = useState(false)

    let minScoreBoardIndex = 0

    /* clear click effect from all btns */
    useEffect(() => {
        setTimeout(()=>{ setBtnOpacity({
                red: false,
                green: false,
                yellow: false,
                blue: false,
            })
        }, 1000);
      }, [btnOpacity]);

    /* update Score and start next sequence or end Game */
    useEffect(()=>{
        if(userSequence.length > 0){
            const lastUserSequencePosition = userSequence.length - 1
            if(userSequence[lastUserSequencePosition] === sequence[lastUserSequencePosition]){
                setScore(score < userSequence.length ? userSequence.length : score )

                if(userSequence.length === sequence.length ){
                    startNewSequence()
                }
            } else {
                sounds.wrong.play()
                endGame()
            }
        }
    }, [userSequence])

    const startGame = async () => {
        setGameStarted(true)
        startNewSequence()
    }

    const startNewSequence = async () => {
        const newSequence = addToSequence(sequence)
        await Promise.all([
            timeout(1500),
            setUserSequence([]),
            setSequence(newSequence)
        ])
        for(let i=0;i<newSequence.length;i++){
            await Promise.all([
                timeout(1000),
                pressColorBtn(newSequence[i], false)
            ])

            if(!gameStarted){
                return
            }
        }
    }

    const addToSequence = (sequence) => {
        const newAction = boardBtns[Math.floor(Math.random() * boardBtns.length)]
        return [...sequence, newAction]
    }

    const pressColorBtn = async (color, userAction = true)=>{
        sounds[color].play((success) => {
            if (!success) { console.log('Sound did not play') }
        })
        setBtnOpacity(prevState => {
            return {...prevState, [color]: true }
        })
        if(userAction){
            setUserSequence(prevState => {
                return [...prevState, color]
            })
        }
    }

    const resetGame = () =>{
        setGameStarted(false)
        setSequence([])
        setName('')
        setUserSequence([])
    }

    const endGame = async () => {
        await actions.getTopScores()
        resetGame()
        checkAndUpdateTopScore()
    }

    const checkAndUpdateTopScore = async () => {
        console.log(topTen)
        if(topTen && topTen.length >= 10){
            minimum = topTen.reduce((acc, cur, index) => {
                return acc.score > cur ? acc : {index, score: cur}
            },{index: 0, score: 0})
            if(score > minimum.score){
                minScoreBoardIndex = minimum.index
                setDialogVisible(true)
            }else{
                navigation.navigate('ScoreBoard')
            }
        }else{
            setDialogVisible(true)
        }
    }

    const sortAndUpdateTopScore = () => {
        let topScore = [...topTen]
        if(topScore.length >= 10){
            topScore[minScoreBoardIndex] = {name, score}
        }else{
            topScore = [...topTen, {name, score}] 
        }

        topScore.sort((a,b)=>{ return b.score-a.score })
        console.log(topScore)
        actions.updateTopScores(topScore)
    }

    const submitName = () => {
        setDialogVisible(false)
        if(name != ''){
            sortAndUpdateTopScore()
        }
        navigation.navigate('ScoreBoard')
    }

    return (
        <View style={styles.container}>
            <View style={styles.boardWrap}>
                <View style={styles.board}>
                    <View style={{...styles.boardRow, alignItems: 'flex-end'}}>
                        <BoardBtn color={boardBtns[0]} onClick={pressColorBtn} btnOpacity={btnOpacity[boardBtns[0]]} />
                        <BoardBtn color={boardBtns[1]} onClick={pressColorBtn} btnOpacity={btnOpacity[boardBtns[1]]} />
                    </View>
                    <View style={{...styles.boardRow, alignItems: 'flex-start'}}>
                        <BoardBtn color={boardBtns[2]} onClick={pressColorBtn} btnOpacity={btnOpacity[boardBtns[2]]} />
                        <BoardBtn color={boardBtns[3]} onClick={pressColorBtn} btnOpacity={btnOpacity[boardBtns[3]]} />
                    </View>
                </View>
            </View>
            <View style={styles.boardDetails}>
                <Text style={styles.scoreLabel}>{ `Score: ${score}`}</Text>
                    <TouchableOpacity
                        style={styles.startBtn}
                        disabled={gameStarted}
                        underlayColor={'blue'}
                        onPress={startGame}>
                        <Text style={styles.startBtnText}>{ `Start` }</Text>
                    </TouchableOpacity>
            </View>
            <View>
                <TopScoreDialog 
                    dialogVisible={dialogVisible} 
                    handleSubmit={submitName}
                    updateName={setName}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: "column",
        justifyContent: 'center',
    },
    boardWrap:{
        flex:5,
        paddingHorizontal:15,
        justifyContent: "center",
    },
    board:{
        flexDirection: "column",
        justifyContent: 'center',
        borderRadius: screenWidth/2 - 15,
        height: screenWidth - 30,
        overflow:'hidden',
        borderColor: '#000',
        borderWidth: 5
    },
    boardRow: {
        flex:1,
        flexDirection: "row",
        justifyContent: 'center',
    },
    boardDetails:{
        flex:1,
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 5,
        borderTopColor: "#000000"
    },
    startBtn:{
        borderRadius: 15,
        paddingVertical: 25,
        paddingHorizontal: 50,
        backgroundColor: 'blue',
    },
    startBtnText:{
        fontSize: 22,
        fontWeight: 'bold',
    },
    scoreLabel:{
        fontSize: 22,
    }
})

export default WithScore(GameScreen)