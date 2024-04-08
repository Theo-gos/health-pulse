<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Test Results</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <style>
        * {
            box-sizing: border-box;
        }
    </style>

</head>

<body style='
    font-family: Figtree, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    color: rgb(17 24 39);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: rgb(229 231 235);
'>
    <div style='
        padding-top: 24px;
        padding-bottom: 24px;
    '>
        <div style='
            width: 100%;
            height: 80px;
            padding-left: 16px;
            padding-right: 16px;
            font-size: 13px;
            background-color: rgb(255 255 255);
        '>
            <div style='
                position: relative;
                align-items: center;
                justify-content: space-between;
                width: 92%;
                height: 100%;
                margin-left: auto;
                margin-right: auto;
            '>
                <div style='
                    position: absolute;
                    left: 0;
                    top: 25px;
                    width: fit-content;
                '>
                    <img src="https://res.cloudinary.com/dg2t3lprx/image/upload/v1711680198/elndyesglm3er6mgqs0t.png" alt="HealthPulse" width="30px" height="30px" style="float: left;">
                    <div style='
                        color: rgb(96 165 250);
                        margin-left: 40px;
                        font-size: 20px;
                        line-height: 28px;
                    '>
                        HealthPulse
                    </div>
                </div>

                <div style='
                    color: rgb(96 165 250);
                    width: 50%;
                    text-align: right;
                    position: absolute;
                    right: 0;
                    top: 25px;
                '>
                    <div>39 Le Duan, Ben Nghe Ward, District 1</div>
                    <div>Ho Chi Minh city, Vietnam</div>
                </div>
            </div>
        </div>

        <div style='
            width: 100%;
            margin-top: 8px;
            padding-left: 16px;
            padding-right: 16px;
        '>
            <div style="
                width: 91.666690%;
                height: 56px;
                margin-left: auto;
                margin-right: auto;
                padding-top: 8px;
                text-align: center;
                font-size: 36px;
                line-height: 40px;
                font-weight: bold; 
                color: #1366DE;
            ">
                TEST RESULTS
            </div>

            <div style="
                width: 90%;
                margin-top: 8px;
                color: rgb(59 130 246);
                font-size: 13px;
            ">
                <div style='
                    width: 100%;
                    padding: 16px;
                    background-color: rgb(255 255 255);
                '>
                    <div style="height: 40px;"> <strong>Patient #:</strong> {{$patient->id}}</div>

                    <div style='
                        height: 40px;
                        margin-top: 8px;
                    '>
                        <strong>Name:</strong> {{$patient->name}}
                    </div>

                    <div style='
                        height: 40px;
                        margin-top: 8px;
                    '>
                        <div style="width: 50%; float: left;"><strong>Age:</strong> {{$patient->age}} </div>
                        <div style="width: 50%; float: right;"><strong>Sex:</strong> {{$patient->sex}} </div>
                    </div>

                    <div style='
                        height: 40px;
                        margin-top: 8px;
                    '>
                        <strong>Doctor Name:</strong> {{$doctor->name}}
                    </div>

                    <div style='
                        height: 40px;
                        margin-top: 8px;
                    '>
                        <strong>Date:</strong> {{$data['date']}}
                    </div>
                </div>
            </div>

            <div style="
                width: 90%;
                height: fit-content;
                margin-top: 36px;
            ">
                <div style="
                    width: 100%;
                    padding: 16px;
                    font-weight: bold; 
                    font-size: 14px;
                    line-height: 16px;
                    color: #1366DE;
                    background-color: rgb(191 219 254);
                ">
                    Main Complaint
                </div>
                <div style="
                    width: 100%;
                    padding: 16px;
                    font-size: 12px;
                    line-height: 14px;
                    color: rgb(59 130 246);
                    background-color: rgb(219 234 254);
                ">
                    {{$data['main_complaint']}}
                </div>
            </div>

            <div style="
                width: 90%;
                height: fit-content;
                margin-top: 16px;
                margin-bottom: 16px;
            ">
                <div style="
                    width: 100%;
                    padding: 16px;
                    font-weight: bold; 
                    font-size: 14px;
                    line-height: 16px;
                    color: #1366DE;
                    background-color: rgb(191 219 254);
                ">
                    Objective Note
                </div>
                <div style="
                    width: 100%;
                    padding: 16px;
                    font-size: 12px;
                    line-height: 14px;
                    color: rgb(59 130 246);
                    background-color: rgb(219 234 254);
                ">
                    {{$data['objective_note']}}
                </div>
            </div>

            <div style="page-break-before: always;"></div>

            <div style='
                width: 90%;
                min-height: 256px;
                margin-top: 30px;
            '>
                <div style="
                    width: 100%;
                    padding: 12px;
                    font-size: 14px;
                    line-height: 16px;
                    font-weight: bold; 
                    color: #1366DE;
                    background-color: rgb(191 219 254);
                ">
                    Diagnoses
                </div>
                <div style="
                    width: 100%;
                    min-height: 192px;
                    padding: 12px;
                    font-size: 12px;
                    line-height: 14px;
                    background-color: rgb(219 234 254);
                    color: rgb(59 130 246);
                ">
                    @if(count($data['diagnoses']) > 0)
                    @foreach ($data['diagnoses'] as $diagnosis)
                    <div style='
                        width: 97%;
                        padding: 4px;
                        margin-top: 8px;
                        background-color: rgb(255 255 255);
                    '>
                        <div style='
                            height: 10px;
                            padding: 8px;
                        '>
                            <div style="
                                font-weight: bold;
                                font-size: 12px;
                                line-height: 14px;
                                float: left;
                            ">
                                {{$diagnosis['icd_code']}}
                            </div>
                            <div style='
                                font-size: 12px;
                                line-height: 14px;
                                float: right;
                                margin-right: 10px;
                            '>
                                {{$diagnosis['date']}}
                            </div>
                        </div>

                        <div style='
                            height: 10px;
                            margin-top: 8px;
                            padding: 8px;
                            font-size: 12px;
                            line-height: 14px;
                        '>
                            {{$diagnosis['icd_name']}}
                        </div>
                    </div>
                    @endforeach
                    @else
                    <div>No diagnoses</div>
                    @endif
                </div>
            </div>

            <div style='
                width: 90%;
                min-height: 256px;
                margin-top: 30px;
            '>
                <div style="
                    width: 100%;
                    padding: 12px;
                    font-size: 14px;
                    line-height: 16px;
                    font-weight: bold; 
                    color: #1366DE;
                    background-color: rgb(191 219 254);
                ">
                    Prescription
                </div>
                <div style="
                    width: 100%;
                    min-height: 192px;
                    padding: 12px;
                    font-size: 12px;
                    line-height: 14px;
                    background-color: rgb(219 234 254);
                    color: rgb(59 130 246);
                ">
                    @if(count($data['prescriptions']) > 0)
                    @foreach ($data['prescriptions'] as $prescription)
                    <div style='
                        width: 97%;
                        padding: 4px;
                        margin-top: 8px;
                        background-color: rgb(255 255 255);
                    '>
                        <div style='
                            height: 10px;
                            padding: 8px;
                        '>
                            <div style="
                                font-weight: bold;
                                font-size: 12px;
                                line-height: 14px;
                                float: left;
                            ">
                                {{$prescription['medication_name'] . ', ' . $prescription['dose'] . ', ' . $prescription['pill_per_day'] . 'per day.'}}
                            </div>
                            <div style='
                                font-size: 12px;
                                line-height: 14px;
                                margin-right: 10px;
                                float: right
                            '>
                                {{$prescription['date']}}
                            </div>
                        </div>

                        <div style='
                            height: 10px;
                            margin-top: 8px;
                            padding: 8px;
                            font-size: 12px;
                            line-height: 14px;
                        '>
                            {{$prescription['recommendation']}}
                        </div>
                    </div>
                    @endforeach
                    @else
                    <div>No prescription</div>
                    @endif
                </div>
            </div>

            <div style="page-break-before: always;"></div>

            <div style='
                width: 90%;
                min-height: 256px;
                margin-top: 30px;
            '>
                <div style="
                    width: 100%;
                    padding: 12px;
                    font-size: 14px;
                    line-height: 16px;
                    font-weight: bold; 
                    color: #1366DE;
                    background-color: rgb(191 219 254);
                ">
                    Test results
                </div>
                <div style="
                    width: 100%;
                    min-height: 192px;
                    padding: 12px;
                    font-size: 12px;
                    line-height: 14px;
                    background-color: rgb(219 234 254);
                    color: rgb(59 130 246);
                ">
                    <div style='
                        width: 95%;
                        padding: 4px;
                        margin-top: 8px;
                        border-bottom: 1px solid #1366DE;
                    '>
                        <div style='
                            height: 20px;
                            padding: 8px;
                        '>
                            <div style="
                                font-weight: bold;
                                font-size: 12px;
                                line-height: 14px;
                                float: left;
                            ">
                                Test
                            </div>
                            <div style='
                                font-size: 12px;
                                line-height: 14px;
                                float: right;
                                margin-right: 30px;
                            '>
                                Result
                            </div>
                        </div>
                    </div>
                    @if(count($data['tests']) > 0)
                    @foreach ($data['tests'] as $test => $result)
                    <div style='
                        width: 97%;
                        padding: 4px;
                        margin-top: 8px;
                    '>
                        <div style='
                            height: 20px;
                            padding: 8px;
                        '>
                            <div style="
                                font-weight: bold;
                                font-size: 12px;
                                line-height: 14px;
                                float: left;
                            ">
                                {{$test}}
                            </div>
                            <div style='
                                font-size: 12px;
                                line-height: 14px;
                                float: right;
                                margin-right: 30px;
                            '>
                                {{$result}}
                            </div>
                        </div>
                    </div>
                    @endforeach
                    @else
                    <div>No test results</div>
                    @endif
                </div>
            </div>

            <div style="
                width: 100%;
                height: 30vh;
                margin-top: 30px;
            ">
                <div style='
                    width: 50%;
                    padding: 8px;
                    text-align: center;
                    float: right;
                '>
                    <div style="font-weight: bold; color: #1366DE;">Doctor's Signature</div>
                    <img src='{{$data["signature"]}}' width="70px" height="60px" style="margin-top: 8px;" />
                    <div style="margin-top: 8px;">Dr. {{$doctor->name}}</div>
                </div>
            </div>
        </div>
    </div>
</body>

</html>