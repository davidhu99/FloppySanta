from flask import Flask, render_template, request
app = Flask(__name__)


@app.route('/')
def index():
    
    return render_template('submit.html')

@app.route('/submit', methods=['POST'])
def submit():
    if request.method == 'POST':       
        username = request.form['username']
        score = 200 # hardcoded for now 
        if username == '': 
            return render_template('submit.html',  message="Whoops,please enter a valid username!")

        with open('leaderboard.txt') as f:
            score_list = f.read().splitlines()
        score_list.pop() 

        score_list.append(username + ' ' + str(score))
        
        score_list = sorted(score_list, key=lambda s:int(s.split()[1]), reverse=True)

        with open('leaderboard.txt', 'w') as writer:
            for score in score_list:
                writer.write(score + '\n')
        return render_template('leaderboard.html', score_list=score_list)

if __name__ == '__main__':
    app.debug = True
    app.run()