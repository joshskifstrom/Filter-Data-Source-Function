// Learn more about source functions API at
// https://segment.com/docs/connections/sources/source-functions

/**
 * Handle incoming HTTP request
 *
 * @param  {FunctionRequest} request
 * @param  {FunctionSettings} settings
 */
async function onRequest(request, settings) {
	const object = request.json();
	//Flag events without identifying keys
	if (object.traits === undefined && object.properties === undefined) {
		console.log('No identifier key provided');
	}
	//ProspectUpdateEvent payload identify()
	else if (
		object.traits !== undefined &&
		JSON.stringify(object.traits.RoutingKey).toLowerCase() ===
			JSON.stringify(
				'corporate.people.prospect-OnProspectUpdateEvent'
			).toLowerCase()
	) {
		let bankInfosArray = object.traits.Data.BankInfos;
		let bankInfosArrayTransformed = bankInfosArray.reduce(
			(bankInfosArrayTransformed, data) => {
				bankInfosArrayTransformed.push({
					bankInfosAccountDigit: data.AccountDigit,
					bankInfosAgencyNumber: data.AgencyNumber,
					bankInfosBankInfoType: data.BankInfoType,
					bankInfosBankNumber: data.BankNumber,
					bankInfosDefault: data.Default,
					bankInfosJointAccountFile: data.JointAccountFile
				});
				return bankInfosArrayTransformed;
			},
			[]
		);

		let traits = {
			acceptPrivacyPolicy: object.traits.Data.AcceptPrivacyPolicy,
			addressInfoCity: object.traits.Data.AddressInfo.City,
			addressInfoCityName: object.traits.Data.AddressInfo.CityName,
			addressInfoCountry: object.traits.Data.AddressInfo.Country,
			addressInfoNeighborhood: object.traits.Data.AddressInfo.Neighborhood,
			addressIndoState: object.traits.Data.AddressInfo.State,
			addressInfoType: object.traits.Data.AddressInfo.Type,
			addressIndoZipCode: object.traits.Data.AddressInfo.ZipCode,
			advisorInfoAAICode: object.traits.Data.AdvisorInfo.AAICode,
			advisorInfoHasAdvisor: object.traits.Data.AdvisorInfo.HasAdvisor,
			bankInfos: bankInfosArrayTransformed /*array*/,
			birthdate: object.traits.Data.BirthDate,
			birthInfoBirthCountry: object.traits.Data.BirthInfo.BirthCountry,
			birthInfoCity: object.traits.Data.BirthInfo.City,
			birthInfoCityName: object.traits.Data.BirthInfo.CityName,
			birthInfoNationality: object.traits.Data.BirthInfo.Nationality,
			birthInfoState: object.traits.Data.BirthInfo.State,
			broker: object.traits.Data.Broker,
			campaignId: object.traits.Data.CampaignId,
			confirmationEmail: object.traits.Data.ConfirmationEmail,
			customerCode: object.traits.Data.CustomerCode,
			destination: null,
			documentInfoNumber: object.traits.Data.DocumentInfo.Number,
			documentInfoSecurityNumber:
				object.traits.Data.DocumentInfo.SecurityNumber,
			documentInfoState: object.traits.Data.DocumentInfo.State,
			documentInfoType: object.traits.Data.DocumentInfo.Type,
			educationalLevel: object.traits.Data.EducationLevel,
			email: object.traits.Data.Email,
			emailValidation: null /*object.traits.Data.EmailValidation.IsValid*/,
			fatherName: null /*object.traits.Data.EmailValidation.ValidationResult*/,
			gender: object.traits.Data.Gender,
			hasPrivatePensionInMyName: object.traits.Data.HasPrivatePensionInMyName,
			ip: object.traits.Data.IP,
			id: object.traits.Data.Id,
			incomeInfoFinancialApplications:
				object.traits.Data.IncomeInfo.FinancialApplications,
			incomeInfoMensal: object.traits.Data.IncomeInfo.Mensal,
			incomeInfoMovableAssets: object.traits.Data.IncomeInfo.MovableAssets,
			incomeInfoOther: object.traits.Data.IncomeInfo.Other,
			incomeInfoRealState: object.traits.Data.IncomeInfo.RealState,
			investmentsIntentsDerivatives:
				object.traits.Data.InvestmentsIntents.Derivatives,
			investmentsIntentsDontKnow:
				object.traits.Data.InvestmentsIntents.DontKnow,
			investmentsIntentsExchange:
				object.traits.Data.InvestmentsIntents.Exchange,
			investmentsIntentsFixedIncome:
				object.traits.Data.InvestmentsIntents.FixedIncome,
			investmentsIntentsInsurance:
				object.traits.Data.InvestmentsIntents.Insurance,
			investmentsIntentsIntentsInvestmentFunds:
				object.traits.Data.InvestmentsIntents.InvestmentFunds,
			othersHasOthersInvestments:
				object.traits.Data.InvestmentsIntents.Others.HasOthersInvestments,
			othersOthersInvestments:
				object.traits.Data.InvestmentsIntents.Others.OthersInvestments,
			investmentsIntentPrivatePension:
				object.traits.Data.InvestmentsIntents.PrivatePension,
			investmentsIntentsVariableIncome:
				object.traits.Data.InvestmentsIntents.VariableIncome,
			isEncrypted: object.traits.Data.IsEncrypted,
			jobInforCity: object.traits.Data.JobInfo.City,
			jobInfoCityName: object.traits.Data.JobInfo.CityName,
			jobInfCompanyDocumentNumber:
				object.traits.Data.JobInfo.CompanyDocumentNumber,
			jobInfoCompanyName: object.traits.Data.JobInfo.CompanyName,
			jobInfoCurrentlyWorking: object.traits.Data.JobInfo.CurrentlyWorking,
			jobInfoNeighborhood: object.traits.Data.JobInfo.Neighborhood,
			jobInfoNumber: object.traits.Data.JobInfo.Number,
			jobInfoState: object.traits.Data.JobInfo.State,
			jobInfoStreet: object.traits.Data.JobInfo.Street,
			jobInfoZipCode: object.traits.Data.JobInfo.ZipCode,
			lastReprocessDate: object.traits.Data.LastReprocessDate,
			managerAdvisorCode: object.traits.Data.ManagerAdvisorCode,
			maritalInfoSpouseDocumentNumber:
				object.traits.Data.MaritalInfo.SpouseDocumentNumber,
			maritalInfoSpouseName: object.traits.Data.MaritalInfo.SpouseName,
			maritalInfoStatusCode: object.traits.Data.MaritalInfo.StatusCode,
			mobileNumber: object.traits.Data.MobileNumber,
			motherName: object.traits.Data.MortheName,
			name: object.traits.Data.Name,
			origin: object.traits.Data.Origin,
			originDescription: object.traits.Data.OriginDescription,
			pld: object.traits.Data.PLD,
			partnerName: object.traits.Data.PartnerName,
			politicallyExposedPerson: object.traits.Data.PoliticallyExposedPerson,
			professionalOccupation: object.traits.Data.ProfessionalOccupation,
			receiveEmailNews: object.traits.Data.ReceiveEmailNews,
			receiveWhatsappNews: object.traits.Data.ReceiveWhatsappNews,
			relatedPerson: object.traits.Data.RelatedPerson,
			resourceSourcesDivorce: object.traits.Data.ResourceSources.Divorce,
			resourceSourcesDonation: object.traits.Data.ResourceSources.Donation,
			resourceSourcesInheritance:
				object.traits.Data.ResourceSources.Inheritance,
			othersHasOthersSources:
				object.traits.Data.ResourceSources.Others.HasOthersSources,
			othersOthersResourceSources:
				object.traits.Data.ResourceSources.Others.OthersResourceSources,
			resourceSourcesProfessional:
				object.traits.Data.ResourceSources.Professional,
			resourceSourcesRental: object.traits.Data.ResourceSources.Rental,
			resourceSourcesRetirement: object.traits.Data.ResourceSources.Retirement,
			responsibleInfo: object.traits.Data.ResponsibleInfo,
			resumeToken: object.traits.Data.ResumeToken,
			salesforceId: object.traits.Data.SalesForceId,
			source: object.traits.Data.Source,
			status: object.traits.Data.Status,
			stepDesktop: object.traits.Data.Step.Desktop.Completed,
			stepDevice: object.traits.Data.Step.Device,
			stepFinished: object.traits.Data.Step.Finished,
			stepFinsihedDate: object.traits.Data.Step.FinishedDate,
			stepLastUpdateAt: object.traits.Data.Step.LastUpdateAt,
			stepMobileCompleted: object.traits.Data.Step.Mobile.Completed,
			stepMobileCurrent: object.traits.Data.Step.Mobile.Current,
			taxResidenceInfoHasTaxResidence:
				object.traits.Data.TaxResidenceInfo.HasTaxResidence,
			tradeInfo: object.traits.Data.TradeInfo.OwnRisk,
			usPerson: object.traits.Data.USPerson,
			urlPath: object.traits.Data.UrlPath,
			usPersonInfoHasUsPerson: object.traits.Data.UsPersonInfo.HasUsPerson,
			usPersonInfoItinOrSssn: object.traits.Data.UsPersonInfo.ItinOrSsn,
			username: object.traits.Data.UserName,
			variationParameterName: object.traits.Data.Variation.ParameterName,
			variationParameterValue: object.traits.Data.Variation.ParameterValue,
			variationSchema: object.traits.Data.Variation.Schema,
			date: object.traits.Date,
			id: object.traits.Data.Id,
			parentId: object.traits.ParentId,
			routingKey: object.traits.RoutingKey
		};

		// See https://segment.com/docs/connections/spec/identify/
		Segment.identify({
			userId: object.traits.Data.DocumentNumber,
			traits: {
				traits
			}
		});
		//OnTedReceivedEvent payload track()
	} else if (
		object.properties !== undefined &&
		JSON.stringify(object.properties.message.routingKey).toLowerCase() ===
			JSON.stringify(
				'xpinc.people.prospect.bankdata-OnTedRecivedEvent'
			).toLowerCase()
	) {
		let properties = {
			accountNumber: object.properties.message.accountNumber,
			accountType: object.properties.message.accountType,
			agency: object.properties.message.agency,
			amount: object.properties.message.amount,
			bankCode: object.properties.message.bankCode,
			brandId: object.properties.message.brandId,
			clientCode: object.properties.message.clientCode,
			createdAt: object.properties.message.createdAt,
			getAccountNumber: object.properties.message.getAccountNumber,
			getDigitAccountNumber: object.properties.message.getDigitAccountNumber,
			routingKey: object.properties.message.routingKey
		};

		// See https://segment.com/docs/connections/spec/track/
		Segment.track({
			event: 'Money Transferred',
			userId: object.userId,
			properties: {
				properties
			}
		});
		//Flag events and send to the violation source
	} else {
		console.log('Send track call to violation source');
	}
}
