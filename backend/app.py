from flask import Flask, render_template, request, redirect
app = Flask(__name__)


@app.route('/<score>')
def index(score):
    return render_template('submit.html', score=score)

@app.route('/submit', methods=['POST'])
def submit():
    if request.method == 'POST':       
        score = request.form['score']
        username = request.form['username']
        if username == '': 
            return render_template('submit.html', score=score, message="Whoops,please enter a valid username!")
        if ' ' in username:
            return render_template('submit.html', score=score, message="No spaces please!")

        with open('leaderboard.txt') as f:
            score_list = f.read().splitlines()
        score_list.pop() 

        score_list.append(username + ' ' + str(score))
        
        score_list = sorted(score_list, key=lambda s:int(s.split()[1]), reverse=True)

        with open('leaderboard.txt', 'w') as writer:
            for score in score_list:
                writer.write(score + '\n')
        return redirect("http://localhost:8000/assets/html/leaderboard.html")

if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=5000)