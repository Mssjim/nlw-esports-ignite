import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import './styles/main.css';
import logoImg from './assets/logo-nlw-esports.svg';
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { GameController } from 'phosphor-react';
import { Input } from './components/Form/Input';
import { ButtonWeekDays } from './components/Form/ButtonWeekDays';

interface Game {
	id: string,
	title: string,
	bannerUrl: string,
	_count: {
		ads: number
	}
}

function App() {
	const [games, setGames] = useState<Game[]>([]);
	
	useEffect(() => {
		fetch('http://localhost:3333/games')
			.then(res => res.json())
			.then(games => {
				setGames(games);
			});
	}, []);

	return(
		<div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
			<img src={logoImg}/>
			<h1 className='text-6xl text-white font-black my-20'>
				Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.
			</h1>

			<div className='grid grid-cols-6 gap-6 mt-16'>
				{games.map(game => {
					return (
						<GameBanner key={game.id} bannerUrl={game.bannerUrl} title={game.title} adsCount={game._count.ads}/>
					)	
				})}
			</div>

			<Dialog.Root>
				<CreateAdBanner/>

				<Dialog.Portal>
					<Dialog.Overlay className='bg-black/60 inset-0 fixed'>
						<Dialog.Content className='fixed bg-[#2A2634] px-10 py-8 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[500px] shadow-lg shadow-black/25'>
							<Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>
							<form className='mt-8 flex flex-col gap-4'>
								<div className='flex flex-col gap-2'>
									<label htmlFor="game" className='font-semibold'>Qual o game?</label>
									<Input id="game" placeholder="Selecione o game que deseja jogar"/>
								</div>
								<div className='flex flex-col gap-2'>
									<label htmlFor="name">Seu nickname</label>
									<Input id="name" placeholder="Como te chamam dentro do jogo?" />
								</div>

								<div className='grid grid-cols-2 gap-6'>
									<div className='flex flex-col gap-2'>
										<label htmlFor="yearsPlaying">Joga há quantos anos?</label>
										<Input id="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO" />
									</div>
									<div className='flex flex-col gap-2'>
										<label htmlFor="discord">Qual seu Discord?</label>
										<Input id="discord" placeholder="Usuario#0000" />
									</div>
								</div>

								<div className='flex gap-6'>
									<div className='flex flex-col gap-2'>
										<label htmlFor="weekDays">Quando costuma jogar?</label>
										<div className='grid grid-cols-7 gap-0.5'>
											<ButtonWeekDays title='Domingo'>D</ButtonWeekDays>
											<ButtonWeekDays title='Segunda'>T</ButtonWeekDays>
											<ButtonWeekDays title='Terça'>T</ButtonWeekDays>
											<ButtonWeekDays title='Quarta'>Q</ButtonWeekDays>
											<ButtonWeekDays title='Quinta'>Q</ButtonWeekDays>
											<ButtonWeekDays title='Sexta'>S</ButtonWeekDays>
											<ButtonWeekDays title='Sábado'>S</ButtonWeekDays>
										</div>
									</div>
									<div className='flex flex-col gap-2 flex-1'>
										<label htmlFor="hourStart">Qual horário do dia?</label>
										<div className='grid grid-cols-2 gap-2'>
											<Input id="hourStart" type="time" placeholder="De" />
											<Input id="hourEnd" type="time" placeholder="Até" />
										</div>
									</div>
								</div>

								<div className='mt-2 flex gap-2 text-sm'>
									<Input type="checkbox" />
									Costumo me conectar ao chat de voz
								</div>

								<footer className='mt-4 flex justify-end gap-4'>
									<Dialog.Close type='button' className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>
										Cancelar
									</Dialog.Close>
									<button type="submit" className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600'>
										<GameController className='w-6 h-6'/>
										Encontrar duo
									</button>
								</footer>
							</form>
						</Dialog.Content>
					</Dialog.Overlay>
				</Dialog.Portal>
			</Dialog.Root>
		</div>
	)
}

export default App
