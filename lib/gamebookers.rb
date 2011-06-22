class Gamebookers < Celerity::Browser
	SITE_URL='https://www.gamebookers.com/'
	VALID_SPORTS=%w(https://www.gamebookers.com/bets.ap?sportName=american-football&sport=5426
https://www.gamebookers.com/bets.ap?sportName=aussie-rules&sport=15439
https://www.gamebookers.com/bets.ap?sportName=baseball&sport=5425
https://www.gamebookers.com/bets.ap?sportName=basketball&sport=5422
https://www.gamebookers.com/bets.ap?sportName=boxing-%26-mma&sport=15400
https://www.gamebookers.com/bets.ap?sportName=cricket&sport=15440
https://www.gamebookers.com/bets.ap?sportName=football&sport=3893
https://www.gamebookers.com/bets.ap?sportName=golf&sport=15444
https://www.gamebookers.com/bets.ap?sportName=tennis&sport=4259
https://www.gamebookers.com/bets.ap?sportName=volleyball&sport=15450])


	def run
		establish_connection
		#		get_list_of_links
		#		get_valid_sports
		get_data
	end

	def establish_connection
		puts "connecting..."
		goto(SITE_URL)
	end

  def get_list_of_links
    @mainpage_links_hrefs= div(:class, "leftNavText").ul(:index=>0).links.map &:href
  end

	#	def get_valid_sports
	#		valid_sports=@mainpage_links_hrefs.select do |url|
	#			validate_kind_of_bet(url)
	#		end
	#		puts valid_sports
	#		valid_sports
	#	end
	#
	#	def validate_kind_of_bet(url)
	#		goto(url)
	#		select_lists.map(&:id).include? "presBoxSelect"
	#	end

	#итерируем весь список подходящих видов спорта, заглядывая в каждую лигу и тип ставки
	def get_data
		VALID_SPORTS.each do |sport_url|
			goto(sport_url)
			select_leagues
			select_bet_type
		end
	end

	def select_leagues
		puts "\e[33mLeagues:\e[0m"
		puts leagues=select_list(:id,'leaguesSelect').options
		leagues
	end

	def select_bet_type
		puts "\e[35mBet Types:\e[0m"
		puts bet_types=select_list(:id,'presBoxSelect').options
		bet_types
	end


end