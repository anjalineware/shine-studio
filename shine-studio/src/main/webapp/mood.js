
          let moodHistory = [];
      
          function selectMood(mood) {
            const currentDate = new Date();
            const formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
            
            const moodEntry = { mood, date: formattedDate };
            moodHistory.push(moodEntry);
      
            updateSelectedMood();
            updateMoodHistory();
          }
      
          function updateSelectedMood() {
            const selectedMoodElement = document.getElementById('selected-mood');
            const latestEntry = moodHistory[moodHistory.length - 1];
      
            selectedMoodElement.innerHTML = `<p>Date: ${latestEntry.date} | Your selected mood: <strong>${latestEntry.mood}</strong></p>`;
          }
      
          function updateMoodHistory() {
            const historyListElement = document.getElementById('history-list');
            historyListElement.innerHTML = '';
      
            moodHistory.forEach((entry, index) => {
              const entryElement = document.createElement('div');
              entryElement.classList.add('history-entry');
              entryElement.innerHTML = `<select id="editMoodSelect${index}" style="display:none;">
                                        <option value="😄">😄</option>
                                        <option value="😊">😊</option>
                                        <option value="😐">😐</option>
                                        <option value="😞">😞</option>
                                        <option value="😢">😢</option>
                                        </select>
                                        <p>Date: ${entry.date} | Mood: <span id="moodDisplay${index}">${entry.mood}</span></p>
                                        <button onclick="toggleEdit(${index})">Edit</button>
                                        <button onclick="deleteMood(${index})">Delete</button>`;
              entryElement.querySelector(`#editMoodSelect${index}`).value = entry.mood;
              historyListElement.appendChild(entryElement);
            });
          }
      
          function deleteMood(index) {
            moodHistory.splice(index, 1);
            updateMoodHistory();
          }
      
          function toggleEdit(index) {
            const selectElement = document.getElementById(`editMoodSelect${index}`);
            const moodDisplayElement = document.getElementById(`moodDisplay${index}`);
            const buttonElement = document.querySelector(`.history-entry button:nth-child(${index * 3 + 3})`);
      
            if (selectElement.style.display === 'none') {
              // Show select and change button text to "Save"
              selectElement.style.display = 'inline-block';
              moodDisplayElement.style.display = 'none';
              buttonElement.innerText = 'Save';
            } else {
              // Save changes and hide select, change button text back to "Edit"
              const newMood = selectElement.value;
              moodHistory[index].mood = newMood;
              updateMoodHistory();
              selectElement.style.display = 'none';
              moodDisplayElement.style.display = 'inline';
              buttonElement.innerText = 'Edit';
            }
          }
        