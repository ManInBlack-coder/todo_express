describe('clear all button test',function(){
    var clearAllBut, form;

    beforeEach(function(){

        document.body.innerHTML = `
          </div>
                            <div class="card-action">
                                <ul class="collection">
                                <!-- <% console.log(tasks) %> -->
                                <% tasks.forEach((task) =>{ %>
                                    <li class="collection-item"><%= task.task %>
                                     <!--<i class="material-icons">add</i>-->
                                    <a href="delete-task/<%= task.id %>" class="secondary/content"> <i class="material-symbols-outlined">close</i></a>
                                    </li>
                                <% }) %>
                                  <form style="padding: 10px;" action="/clear-tasks" method="POST" id="clearAll">
                                    <input class="btn" type="submit" value="CLEAR ALL id='clear_all'">
                                </ul>
                            </div>
        `;

        clearAllBut = document.getElementById('clear_all');
        form = document.getElementById('clearAll');

        spyOn(form,'submit').and.callFake(function() {

        });
    });

    it('should clear all the tasks from when the button is clicked',function(){
        clearAllBut.click();

        expect(form.submit).toHaveBeenCalled();
    });
});