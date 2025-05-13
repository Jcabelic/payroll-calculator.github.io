const wtaxTable = [
    { Monthly: [
            { 
                StartAmount: 0.00, MaxAmount: 250000, Initial: 0.00, AdditionalTaxPercent: 0
            },
            { 
                StartAmount: 250000, MaxAmount: 400000, Initial: 0.00, AdditionalTaxPercent: 15
            },
            { 
                StartAmount: 400000, MaxAmount: 800000, Initial: 22500.00, AdditionalTaxPercent: 20
            },
            { 
                StartAmount: 800000, MaxAmount: 2000000, Initial: 102500.00, AdditionalTaxPercent: 25
            },
            { 
                StartAmount: 2000000, MaxAmount: 8000000, Initial: 402500.00, AdditionalTaxPercent: 30
            },
            { 
                StartAmount: 8000000, MaxAmount: 10000000, Initial: 2202500.00, AdditionalTaxPercent: 35
            },

        ], 
        Semimonthly: [
            { 
                StartAmount: 0.00, MaxAmount: 20833, Initial: 0.00, AdditionalTaxPercent: 0
            },
            { 
                StartAmount: 20833, MaxAmount: 33332, Initial: 0.00, AdditionalTaxPercent: 15
            },
            { 
                StartAmount: 33333, MaxAmount: 66666, Initial: 1875.00, AdditionalTaxPercent: 20
            },
            { 
                StartAmount: 66667, MaxAmount: 166666, Initial: 8541.80, AdditionalTaxPercent: 25
            },
            { 
                StartAmount: 166667, MaxAmount: 666666, Initial: 33541.80, AdditionalTaxPercent: 30
            },
            { 
                StartAmount: 666667, MaxAmount: 8000000, Initial: 183541.80, AdditionalTaxPercent: 35
            },

        ] 
    }
]