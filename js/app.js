const URL = 'api.php';
 
const S = {};

const signIn = document.querySelector('.signin');
class Chat 
{
	static Html = ['form_login', 'login', 'pass', 'notif', 'modal_wrap', 'close', 'form_create', 'username', 'message', 'list'] 

	static List = []

	static ms = 1000

	static init() 
	{
		if(this.checkAuth())
		{
			this.Html.push('logout');
			signIn.innerHTML = '<a class="logout">Вийти</a>';

			this.getHtml();
			S.logout.onclick = () => this.logout();
		}
		else
		{
			this.Html.push('auth');
			signIn.innerHTML = '<a class="auth">Увійти</a>';

			this.getHtml(); //
			S.auth.onclick = () => this.modal(true);
			S.close.onclick = () => this.modal(false);
		} 

		this.getFullMessages();
	}

	static reInit()
	{
		const self = this;
		setTimeout(() => {
			self.getFullMessages();
			
		}, this.ms);
		

	}

	static getFullMessages() 
	{
		const self = this;
		this.api('list', {}, (response) => {

			const res = JSON.parse(response);

			if(self.List != res)
			{
				self.List = res;
				self.render()

			}
			self.reInit()
			
			
		});
	}

	static getHtml()
	{
		this.Html.forEach((elem) => {
			S[elem] = document.querySelector(`.${elem}`);
		});
	}

	static checkAuth() // Метод проверки Авторизации
	{
		if(sessionStorage.getItem('auth') != null)
			return true;
	}

	static verify(value1, value2)
	{

		const pattern = /<(\/?)([a-z]+)[^>]*(>|$)/gi;
		
		if(value1 != '' && value2 != '' && value1.search(pattern) < 0 && value2.search(pattern) < 0)
			return true;
		else
			alert('Ошибка! Заполните корректно поля!');

	}

	static api(type, data, callback)
	{
		$.post(URL, {type: type, data: JSON.stringify(data)}, response => callback(response));
	}

	static modal(state) // Метод показа и скрытия модального окна
	{
		if(state){
			S.modal_wrap.style.display = 'block';
		} else{
			S.modal_wrap.style.display = 'none';
		}
	}

	static logout()
	{
		sessionStorage.removeItem('auth');
		window.location.reload();
	}

	static login(e)
	{
		e.preventDefault();

		if(this.verify(S.login.value, S.pass.value))
		{

			this.api('login', {login: S.login.value, pass: S.pass.value}, (response) => {
				if(response === 'ok')
				{
					sessionStorage.setItem('auth', true);
					window.location.reload();
				}
				else
				{
					S.notif.innerText = 'Неправильный логин или пароль';
				}
			})
			
		}
	}

	static add(e)
	{
		e.preventDefault();

		if(this.verify(S.username.value, S.message.value))
		{
			let d = new Date();

			let date = d.getDate();

			if(date < 10)
				date = `0${date}`;
			let minutes = d.getMinutes();
			if(minutes<10){
				minutes = "0"+minutes;
			}
			let hours = d.getHours();
			if(hours<10){
				hours = "0"+hours;
			}
			let reg_date = `${date}.${d.getMonth()}.${d.getFullYear()} - ${hours}:${minutes}`;

			let Data = {username: S.username.value, message: S.message.value, reg_date: reg_date};

			const self = this;
			this.api('add', Data, (response) => {
				if(response)
				{
					self.List.push(Data);

					self.render();
					var scrollinDiv = document.getElementsByClassName('list_mess')[0];
					scrollinDiv.scrollTop = 9999;
				}
			})

		}
		let ff = document.getElementsByClassName("message")[0];
		ff.value="";
	}

	static removeMessage(id)
	{
		if(this.checkAuth())
		{
			const self = this;
			this.api('remove', {id: id}, (response) => {
				if(response)
				{
					self.List = self.List.filter((elem) => elem.id != id);

					self.render();
				}
			});
		}
	}
 
	static render()
	{
		S.list.innerHTML = '';

		if(this.List.length > 0)
		{
			if(this.checkAuth())
			{

				this.List.forEach((elem) => {
				S.list.innerHTML += `<div class="message_block"> 
										<div class="message_head">
											<article>
												<p>${elem.username}</p>
												<p>${elem.reg_date}</p>
											</article>
											<span class="message_remove" data-id="${elem.id}" title="Видалити повідомлення"></span>
										</div>
										<p>${elem.message}</p>
									</div>`
				});


				S.message_remove = document.querySelectorAll('.message_remove');

				const self = this;
				S.message_remove.forEach((elem) => {
					elem.onclick = function()
					{
						self.removeMessage(this.getAttribute('data-id'));
					}
				});
			}
			else
			{
				this.List.forEach((elem) => {
				S.list.innerHTML += `<div class="message_block">
										<div class="message_head">
											<article>
												<p>${elem.username}</p>
												<p>${elem.reg_date}</p>
											</article>
										</div>
										<p>${elem.message}</p>
									</div>`
				});
			}
			
		}
		else
		{
			S.list.innerHTML = '<h1 class="empty">Немає повідомлень</h1>';
		}

	}

}

Chat.init();


S.form_create.onsubmit = () => Chat.add(event);
S.form_login.onsubmit = () => Chat.login(event);

